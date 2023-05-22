using System;

namespace WebApplication1.Dtos
{
    public class AuthTokenDto
    {
        public string Token { get; set; }
        public DateTime expireDate { get; set; }
    }
}