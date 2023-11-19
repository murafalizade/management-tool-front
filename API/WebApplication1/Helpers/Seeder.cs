using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;
using Newtonsoft.Json;
using WebApplication1.Services;
using WebApplication1.Dtos;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace WebApplication1.Helpers
{
    public static class DataSeeder
    {
        public static async Task SeedData(IServiceProvider serviceProvider)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                var authService = scope.ServiceProvider.GetRequiredService<IAuthService>();

                // Use Path.Combine to create file path to handle different OS file path formats
                var seedJsonPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Desktop), "WEB", "MyProjects", "hr", "API", "WebApplication1", "DummyData", "data.json");

                // Read seed data from JSON file
                var seedJson = File.ReadAllText(seedJsonPath);
                var seedData = JsonConvert.DeserializeObject<SeedData>(seedJson);
                if (!await dbContext.AdminUsers.AnyAsync())
                {
                    var userEntity = seedData.Entities["Users"] as JArray;
                    var firstUser = userEntity[0];
                    AuthInputDto authInputDto = new()
                    {
                        Email = firstUser["Email"].ToString(),
                        Password = firstUser["Password"].ToString(),
                    };
                    await authService.Register(authInputDto.Email, authInputDto.Password, authInputDto.FirstName, authInputDto.LastName, authInputDto.Role);
                    Console.WriteLine("Admin user created");
                }

                if (!await dbContext.Discounts.AnyAsync())
                {
                    var discounts = seedData.Entities["Discounts"] as JArray;
                    Console.WriteLine(discounts[0]);
                    var firstDiscount = discounts[0];
                    Discount discount = new()
                    {
                        Chernobyl = (decimal)firstDiscount["Chernobyl"],
                        Desert = (decimal)firstDiscount["Desert"],
                        Food = (decimal)firstDiscount["Food"],
                        TaxPercentage = (int)firstDiscount["TaxPercentage"],
                        Veteran = (decimal)firstDiscount["Veteran"],
                        Dsmf = (int)firstDiscount["Dsmf"],
                        Disability = (decimal)firstDiscount["Disability"],
                        Martyr = (decimal)firstDiscount["Martyr"],
                        Refugee = (decimal)firstDiscount["Refugee"],
                        HealthInjurance = (int)firstDiscount["HealthInjurance"],
                        Owner = (decimal)firstDiscount["Owner"],
                        VeteranTaxDiscount = (decimal)firstDiscount["VeteranTaxDiscount"],
                        MinWage = (int)firstDiscount["MinWage"],
                    };
                    dbContext.Discounts.Add(discount);
                    Console.WriteLine("Discounts created");
                }

                if (!await dbContext.Ranks.AnyAsync())
                {
                    var ranks = seedData.Entities["Ranks"] as JArray;
                    var firstRank = ranks[0];

                    Rank rank = new()
                    {
                        Name = (string)firstRank["Name"],
                        Salary = (int)firstRank["Price"],
                    };

                    dbContext.Ranks.Add(rank);
                    Console.WriteLine("Ranks created");
                }

                if (!await dbContext.Rents.AnyAsync())
                {
                    var rents = seedData.Entities["Rents"] as JArray;
                    var firstRent = rents[0];

                    Rent rent = new()
                    {
                        Name = (string)firstRent["Name"],
                        Price = (decimal)firstRent["Price"],
                    };
                    dbContext.Rents.Add(rent);
                    Console.WriteLine("Rents created");
                }

                await dbContext.SaveChangesAsync();
            }
        }
    }
}
