using backend.Data;
using Microsoft.Azure.Functions.Worker.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.ComponentModel;
using Microsoft.Extensions.Logging;
using backend.Interfaces;
using backend.Services;
using Microsoft.AspNetCore.Cors.Infrastructure;

var builder = FunctionsApplication.CreateBuilder(args);

var configuration = new ConfigurationBuilder()
    .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables()
    .Build();

var AllowedOrigin = Environment.GetEnvironmentVariable("JWT_AUDIENCE");

// Configure CORS to allow a single client URL
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(AllowedOrigin!)
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Get connection strings
var systemDbConnection = configuration.GetConnectionString("SYSTEM_DATABASE_CONNECTION_STRING");


// Register SystemDbContext
builder.Services.AddDbContext<SystemDbContext>(options =>
    options.UseSqlServer(systemDbConnection).UseLazyLoadingProxies());

// Register Services
builder.Services.AddScoped<IPasswordService, PasswordService>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IFurnitureService, FurnitureService>();
builder.Services.AddScoped<IRoomDesignService, RoomDesignService>();



builder.ConfigureFunctionsWebApplication();

builder.Build().Run();
