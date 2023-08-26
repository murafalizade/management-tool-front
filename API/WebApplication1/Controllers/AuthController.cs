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

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api")]

    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        private readonly ILogger<AuthController> _logger;

        public AuthController(ILogger<AuthController> logger, IAuthService authService)
        {
            _logger = logger;
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] AuthInputDto obj)
        {
            _logger.LogInformation("Registering user");
            ErrorHandelerDto req = await _authService.Register(obj.Email, obj.Password);
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

        [HttpPut]
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
