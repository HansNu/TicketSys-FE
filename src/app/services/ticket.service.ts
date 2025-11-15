import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket, CreateTicketRequest, UpdateTicketRequest, UpdateTicketStatusRequest } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5004/api/Tickets'

  getMyTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/GetTickets`);
  }

  getTicketById(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/GetTicketByTicketId/${id}`);
  }

  createTicket(request: CreateTicketRequest): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.apiUrl}/CreateTicket`, request);
  }

  updateTicketDetail(id: number, request: UpdateTicketRequest): Observable<Ticket> {
    return this.http.patch<Ticket>(`${this.apiUrl}/UpdateTicketDetail/${id}`, request);
  }

  updateTicketStatus(id: number, request: UpdateTicketStatusRequest): Observable<Ticket> {
    return this.http.patch<Ticket>(`${this.apiUrl}/UpdateTicketStatus/${id}`, request);
  }
}