export interface Token {
    access: string;
    refresh: string;
  }

export interface IEvent {
    id: number;
    title: string;
    description: string;
    date: Date;
    location: string;
    tickets_available: number;
  }

export interface ITicket {
    ticket_id: number;
    event_title: string;
    event_description: string;
    event_date: Date; 
    event_location: string;
}
