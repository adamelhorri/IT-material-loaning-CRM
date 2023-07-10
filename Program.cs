using DistributionAPI.Data;
using Microsoft.EntityFrameworkCore;

var articleOrigins = "_myarticleOrigins";
var userOrigins = "_myuserOrigins";
var attributionOrigins = "_myattributionOrigins";
var purchaseOrigins = "_myattributionOrigins";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options => options.AddPolicy(name: "articleOrigins", 
    policy =>
{
    policy.WithOrigins("http//localhost:4200", "http//localhost:7215").AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
}));
builder.Services.AddCors(options => options.AddPolicy(name: "userOrigins",
    policy =>
    {
        policy.WithOrigins("http//localhost:4200", "http//localhost:7215").AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
    }));
builder.Services.AddCors(options => options.AddPolicy(name: "attributionOrigins",
    policy =>
    {
        policy.WithOrigins("http//localhost:4200", "http//localhost:7215").AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
    }));
builder.Services.AddCors(options => options.AddPolicy(name: "purchaseOrigins",
    policy =>
    {
        policy.WithOrigins("http//localhost:4200", "http//localhost:7215").AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
    }));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("articleOrigins");
app.UseCors("userOrigins");
app.UseCors("attributionOrigins");
app.UseCors("purchaseOrigins");
app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();




