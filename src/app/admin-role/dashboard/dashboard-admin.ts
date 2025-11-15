import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket, UpdateTicketStatusRequest } from '../../models/ticket.model';

@Component({
  selector: 'app-dashboard-admin',
  standalone : true,
  imports: [CommonModule],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard.css',
})
export class DashboardAdminComponent implements OnInit {
  constructor(
      private ticketService: TicketService
    ) { }

  tickets: Ticket[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  // Process ticket modal
  showProcessModal = false;
  processingTicket: Ticket | null = null;
  isProcessing = false;

  ngOnInit(): void {
    this.loadAllTickets();
  }

  loadAllTickets(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.ticketService.getMyTickets().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.isLoading = false;
        console.log('Loaded all tickets:', tickets);
      },
      error: (error) => {
        console.error('Error loading tickets:', error);
        this.errorMessage = 'Failed to load tickets';
        this.isLoading = false;
      }
    });
  }

  // Process modal methods
  openProcessModal(ticket: Ticket): void {
    this.processingTicket = ticket;
    this.showProcessModal = true;
  }

  closeProcessModal(): void {
    this.showProcessModal = false;
    this.processingTicket = null;
  }

  // Update ticket status
  updateStatus(newStatus: string): void {
    if (!this.processingTicket) return;

    this.isProcessing = true;
    this.errorMessage = '';

    const request: UpdateTicketStatusRequest = {
      status: newStatus
    };

    this.ticketService.updateTicketStatus(this.processingTicket.id, request).subscribe({
      next: (ticket) => {
        console.log('Ticket status updated:', ticket);
        this.successMessage = `Ticket #${ticket.id} status updated to ${newStatus}`;
        this.closeProcessModal();
        this.loadAllTickets(); // Reload the list
        this.isProcessing = false;
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error) => {
        console.error('Error updating ticket status:', error);
        this.errorMessage = error.error?.message || 'Failed to update ticket status';
        this.isProcessing = false;
      }
    });
  }

  // Approve ticket (Requested -> Open)
  approveTicket(): void {
    this.updateStatus('Open');
  }

  // Reject ticket (Requested -> Reject)
  rejectTicket(): void {
    this.updateStatus('Reject');
  }

  // Close ticket (Open -> Closed)
  closeTicket(): void {
    this.updateStatus('Closed');
  }

  // Utility methods
  showGearIcon(ticket: Ticket): boolean {
    // Show gear icon only for 'Requested' and 'Open' status
    return ticket.status === 'Requested' || ticket.status === 'Open';
  }

  canApproveOrReject(ticket: Ticket): boolean {
    return ticket.status === 'Requested';
  }

  canClose(ticket: Ticket): boolean {
    return ticket.status === 'Open';
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Open':
        return 'badge bg-success';
      case 'Requested':
        return 'badge bg-warning text-dark';
      case 'Closed':
        return 'badge bg-secondary';
      case 'Reject':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  }

  getPriorityBadgeClass(priority: string): string {
    switch (priority) {
      case 'High':
        return 'badge bg-danger';
      case 'Medium':
        return 'badge bg-warning text-dark';
      case 'Low':
        return 'badge bg-info';
      default:
        return 'badge bg-secondary';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

}
