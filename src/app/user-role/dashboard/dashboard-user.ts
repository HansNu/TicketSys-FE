import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateTicketRequest, Ticket, UpdateTicketRequest } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-user',
  standalone : true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-user.html',
  styleUrl: './dashboard.css',
})
export class DashboardUserComponent implements OnInit {
constructor(
    private ticketService: TicketService,
  ) { }

  tickets: Ticket[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  // Create ticket modal
  showCreateModal = false;
  newTicket: CreateTicketRequest = {
    title: '',
    description: '',
    priority: 'Medium'
  };
  isCreating = false;

  // Edit ticket modal
  showEditModal = false;
  editingTicket: Ticket | null = null;
  editTicketData: UpdateTicketRequest = {
    title: '',
    description: '',
    priority: ''
  };
  isUpdating = false;

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.ticketService.getMyTickets().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.isLoading = false;
        console.log('Loaded tickets:', tickets);
      },
      error: (error) => {
        console.error('Error loading tickets:', error);
        this.errorMessage = 'Failed to load tickets';
        this.isLoading = false;
      }
    });
  }

  // Create ticket methods
  openCreateModal(): void {
    this.showCreateModal = true;
    this.newTicket = {
      title: '',
      description: '',
      priority: 'Medium'
    };
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
    this.newTicket = {
      title: '',
      description: '',
      priority: 'Medium'
    };
  }

  createTicket(): void {
    this.isCreating = true;
    this.errorMessage = '';

    this.ticketService.createTicket(this.newTicket).subscribe({
      next: (ticket) => {
        console.log('Ticket created:', ticket);
        this.successMessage = 'Ticket created successfully!';
        this.closeCreateModal();
        this.loadTickets(); // Reload the list
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error) => {
        console.error('Error creating ticket:', error);
        this.errorMessage = 'Failed to create ticket';
        this.isCreating = false;
      }
    });
  }

  // Edit ticket methods
  openEditModal(ticket: Ticket): void {
    if (ticket.status !== 'Requested') {
      this.errorMessage = 'You can only edit tickets with "Requested" status';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }

    this.editingTicket = ticket;
    this.editTicketData = {
      title: ticket.title,
      description: ticket.description,
      priority: ticket.priority
    };
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.editingTicket = null;
    this.editTicketData = {
      title: '',
      description: '',
      priority: ''
    };
  }

  updateTicket(): void {
    if (!this.editingTicket) return;

    this.isUpdating = true;
    this.errorMessage = '';

    this.ticketService.updateTicketDetail(this.editingTicket.id, this.editTicketData).subscribe({
      next: (ticket) => {
        console.log('Ticket updated:', ticket);
        this.successMessage = 'Ticket updated successfully!';
        this.closeEditModal();
        this.loadTickets(); // Reload the list
        this.isUpdating = false;
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error) => {
        console.error('Error updating ticket:', error);
        this.errorMessage = error.error?.message || 'Failed to update ticket';
        this.isUpdating = false;
      }
    });
  }

  // Utility methods
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

  canEdit(ticket: Ticket): boolean {
    return ticket.status === 'Requested';
  }

}
