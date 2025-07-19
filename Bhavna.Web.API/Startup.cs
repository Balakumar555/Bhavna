using Bhavna.Web.API.DdContextConfiguration;
using Bhavna.Web.API.Interfaces;
using Bhavna.Web.API.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;  
using Newtonsoft.Json;


namespace Bhavna.Web.API
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
      

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {

            services.AddDbContext<ApplicationDBContext>(options =>
            options.UseSqlServer(_configuration.GetConnectionString("DefaultConnection")));
            services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
            });

            services.AddMvc().AddXmlSerializerFormatters();

            // Added services
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAngularApp", builder =>
                {
                    builder.WithOrigins("http://localhost:4200")
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                });
            });

            // Add Swagger services
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Web.API",
                    Version = "v1",
                    Description = "Bhavna Web API", // Optional description
                    Contact = new OpenApiContact  // Optional contact info
                    {
                        Name = "Balakumar",
                        Email = "balakumar@yahoo.com"
                    }
                });
            });
        }
        //

        //

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Enable Swagger middleware (both in Development and Production if you want)
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Bhavna Web API v1");
                c.RoutePrefix = string.Empty;
            });

            //using (var serviceScope = app.ApplicationServices.CreateScope())
            //{
            //    var dbContext = serviceScope.ServiceProvider.GetRequiredService<ApplicationDBContext>();

            //    if (env.IsDevelopment())
            //    {
            //        dbContext.Database.Migrate();
            //        SeedData.Initialize(dbContext);
            //    }
            //}
            app.UseCors("AllowAngularApp");
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}