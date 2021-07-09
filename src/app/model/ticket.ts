export interface Ticket{
    id: number,
    type: string,
    status: string,
    userId: number,
    userEmail: string,
    userName: string,
    content: string,
    comment: string,
    attachment: string,
    employeeId: number,
    createdAt: Date,
    updatedAt: Date
}