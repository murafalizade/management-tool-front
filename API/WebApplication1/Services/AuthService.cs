using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using WebApplication1.Dtos;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepository;

        public AuthService(IUserRepository userRepository, IConfiguration configuration)
        {
            _configuration = configuration;
            _userRepository = userRepository;
        }

        public async Task<ErrorHandelerDto> Login(string email, string password)
        {
            User user = await _userRepository.GetUserByEmail(email);
            ErrorHandelerDto error = new ErrorHandelerDto();
            if (user == null)
            {
                error.isError = true;
                error.StatusCode = 404;
                error.data = "Istifadeci tapilmadi";
                return error;
            }
            if (ComparePassword(password, user.PasswordSalt, user.PasswordHash))
            {
                error.isError = true;
                error.StatusCode = 401;
                error.data = "Sifre yanlisdir";
                return error;
            }
            string token = CreateToken(user);
            error.StatusCode = 200;
            error.data = new AuthTokenDto
            {
                Token = token,
                expireDate = DateTime.Now.AddDays(7)
            };
            return error;
        }

        public async Task<ErrorHandelerDto> Register(string email, string password)
        {
            User currentUser = await _userRepository.GetUserByEmail(email);
            if (currentUser != null){
                ErrorHandelerDto error = new ErrorHandelerDto();
                error.isError = true;
                error.StatusCode = 400;
                error.data = "Bu email artiq movcuddur";
                return error;
            }
            User user = new User();
            user.Email = email;
            CreatePasswordHash(password, out byte[] passwordSalt, out byte[] passwordHash);
            user.PasswordSalt = passwordSalt;
            user.PasswordHash = passwordHash;
            await _userRepository.AddUser(user);
            string token = CreateToken(user);
            ErrorHandelerDto errorHandelerDto = new ErrorHandelerDto();
            errorHandelerDto.StatusCode = 200;
            errorHandelerDto.data = new AuthTokenDto
            {
                Token = token,
                expireDate = DateTime.Now.AddDays(7)
            };
            return errorHandelerDto;
        }

        public Task<bool> UserExists(string email)
        {
            throw new System.NotImplementedException();
        }


        private void CreatePasswordHash(string password, out byte[] passwordSalt, out byte[] passwordHash)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool ComparePassword(string password, byte[] passwordSalt, byte[] passwordHash)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                var computedPassword = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedPassword.SequenceEqual(passwordHash);
            }
        }

        private string CreateToken(User user)
        {
            var claims = new List<Claim>{
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(ClaimTypes.Name,user.Email)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = cred
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}