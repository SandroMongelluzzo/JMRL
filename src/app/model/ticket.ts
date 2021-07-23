export interface Ticket{
    id: number,
    type: string,
    status: string,
    userId: number,
    content: string,
    comment: string,
    attachment: string,
    employeeId: number,
    createdAt: Date,
    updatedAt: Date
}

export interface Ticket2{
    id: number,
    issue: string,
    errorCode: string,
    status: string,
    priority: string,
    createdAt: Date,
    updatedAt: Date
}