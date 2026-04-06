// app/api/clients/route.ts
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Validate required fields
        const requiredFields = ['name', 'email', 'phone', 'problemType', 'monetaryRange', 'caseDetails']
        const missingFields = requiredFields.filter(field => !body[field])

        if (missingFields.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Missing required fields: ${missingFields.join(', ')}`
                },
                { status: 400 }
            )
        }

        // Create client in database
        const client = await prisma.client.create({
            data: {
                name: body.name,
                email: body.email,
                phone: body.phone,
                problemType: body.problemType,
                urgent: body.urgent || false, // Optional, defaults to false
            }
        })

        return NextResponse.json({
            success: true,
            client: {
                id: client.id,
                name: client.name,
                email: client.email,
                phone: client.phone
            }
        })

    } catch (error) {
        console.error('Error creating client:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to save client information'
            },
            { status: 500 }
        )
    }
}

// Optional: GET endpoint to fetch clients (if needed)
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (id) {
            const client = await prisma.client.findUnique({
                where: { id }
            })

            if (!client) {
                return NextResponse.json(
                    { success: false, error: 'Client not found' },
                    { status: 404 }
                )
            }

            return NextResponse.json({ success: true, client })
        }

        const clients = await prisma.client.findMany({
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json({ success: true, clients })

    } catch (error) {
        console.error('Error fetching clients:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch clients' },
            { status: 500 }
        )
    }
}