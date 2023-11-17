using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Data;
using WebApplication1.Services;
using WebApplication1.Models;
using WebApplication1.Dtos;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api")]

    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        private readonly ILogger<AuthController> _logger;

        private readonly IConfiguration _configuration;


        public AuthController(ILogger<AuthController> logger, IAuthService authService, IConfiguration configuration)
        {
            _logger = logger;
            _authService = authService;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] AuthInputDto obj)
        {
            _logger.LogInformation("Registering user");
            ErrorHandelerDto req = await _authService.Register(obj.Email, obj.Password, obj.FirstName, obj.LastName, obj.Role);
            if (req.isError == true)
            {
                switch (req.StatusCode)
                {
                    case 400:
                        return BadRequest(req.data);
                    case 404:
                        return NotFound(req.data);
                    case 500:
                        return StatusCode(500, req.data);
                    default:
                        return BadRequest(req.data);
                }
            }

            return Ok(req.data);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AuthInputDto obj)
        {
            ErrorHandelerDto req = await _authService.Login(obj.Email, obj.Password);
            if (req.isError == true)
            {
                switch (req.StatusCode)
                {
                    case 400:
                        return BadRequest(req.data);
                    case 404:
                        return NotFound(req.data);
                    case 500:
                        return StatusCode(500, req.data);
                    default:
                        return BadRequest(req.data);
                }
            }

            return Ok(req.data);
        }

        [HttpGet("user")]
        public async Task<IActionResult> GetUser()
        {
            string authorizationHeader = Request.Headers["Authorization"];

            if (string.IsNullOrEmpty(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
            {
                return BadRequest("Invalid or missing Bearer token in the Authorization header.");
            }

            string jwtToken = authorizationHeader.Substring("Bearer ".Length);

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            JwtSecurityToken jwtSecurityToken = tokenHandler.ReadJwtToken(jwtToken);
            // Extracting the "id" claim from the token's payload
            Claim idClaim = jwtSecurityToken.Claims.FirstOrDefault(claim => claim.Type == "nameid");

            var res = await _authService.GetUser(Int16.Parse(idClaim.Value));
            if (res.data == null)
            {
                return BadRequest(res.data);
            }
            return Ok(res.data);
        }

        [HttpPut("change-password")]
        public async Task<IActionResult> UpdateUser([FromBody] UserUpdateDto user)
        {
            ErrorHandelerDto req = await _authService.UpdateUser(user);
            if (req.isError == true)
            {
                switch (req.StatusCode)
                {
                    case 400:
                        return BadRequest(req.data);
                    case 404:
                        return NotFound(req.data);
                    case 500:
                        return StatusCode(500, req.data);
                    default:
                        return BadRequest(req.data);
                }
            }

            return Ok(req.data);
        }

    }
}
