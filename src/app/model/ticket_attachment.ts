export interface Ticket_Attachment{
    id: number,
    ticketId: number,
    userId: number,
    attachment: Blob,
    comment: string
}