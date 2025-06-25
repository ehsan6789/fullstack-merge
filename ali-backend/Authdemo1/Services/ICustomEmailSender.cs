namespace Authdemo1.Services
{
    public interface ICustomEmailSender
    {
        Task SendEmailAsync(string email, string subject, string htmlMessage);
    }
}
