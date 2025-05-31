import { NextResponse } from 'next/server';
import { addJoinRequest, updateJoinRequest } from '@/lib/store';

export async function POST(request, { params }) {
  try {
    const data = await request.json();
    const request = addJoinRequest(params.id, data.userId, data.message);
    if (!request) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(request, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create join request' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const request = updateJoinRequest(params.id, data.requestId, data.status);
    if (!request) {
      return NextResponse.json(
        { error: 'Project or request not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(request);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update join request' },
      { status: 500 }
    );
  }
} 