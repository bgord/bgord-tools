export class NotificationTemplate {
  constructor(
    private readonly subject: string,
    private readonly message: string,
  ) {}

  get() {
    return { subject: this.subject, html: this.message };
  }
}
