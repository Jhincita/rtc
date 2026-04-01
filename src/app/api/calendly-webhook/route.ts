import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const payload = await request.json();

        if (payload.event !== 'invitee.created') {
            return NextResponse.json({ received: true });
        }

        const invitee = payload.payload.invitee;

        // Find the message answer (default Calendly textarea)
        const questions = invitee.questions_and_answers || [];
        const messageAnswer = questions.find((q: any) => q.question === 'Please share anything that will help prepare for our meeting.')?.answer;

        if (!messageAnswer) {
            console.error('No message found in webhook payload');
            return NextResponse.json({ error: 'No message' }, { status: 400 });
        }

        // Extract client ID from message (format: "Cliente ID: abc-123\nRUT: ...")
        const clientIdMatch = messageAnswer.match(/Cliente ID: ([a-f0-9-]+)/);
        const clientId = clientIdMatch ? clientIdMatch[1] : null;

        if (!clientId) {
            console.error('No client ID found in message');
            return NextResponse.json({ error: 'No client ID' }, { status: 400 });
        }

        // Fetch the client from the database
        const client = await prisma.client.findUnique({
            where: { id: clientId },
        });

        if (!client) {
            console.error('Client not found for ID:', clientId);
            return NextResponse.json({ error: 'Client not found' }, { status: 404 });
        }

        // Send custom email to host
        await resend.emails.send({
            from: 'Your Law Firm <onboarding@resend.dev>',
            to: ['host@example.com'], // Replace with actual host email
            subject: `Scheduled meeting: ${client.name} - ${client.problemType}`,
            html: `
                <h2>New meeting scheduled</h2>
                <p><strong>RUT:</strong> ${client.rut}</p>
                <p><strong>Name:</strong> ${client.name}</p>
                <p><strong>Email:</strong> ${client.email}</p>
                <p><strong>Phone:</strong> ${client.phone}</p>
                <p><strong>Problem Type:</strong> ${client.problemType}</p>
                <p><strong>Monetary Range:</strong> ${client.monetaryRange}</p>
                <p><strong>Case Details:</strong></p>
                <p>${client.caseDetails.replace(/\n/g, '<br>')}</p>
                <p><strong>Meeting:</strong> ${invitee.event.start_time}</p>
            `,
        });

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}