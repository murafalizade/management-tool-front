namespace WebApplication1.Dtos
{
    public enum Roles
    {
        Admin,
        User,
        Viewer,
        Manager
    }
    public class AuthInputDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
