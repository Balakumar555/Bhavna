using Bhavna.Web.API.DdContextConfiguration;
using Bhavna.Web.API.Interfaces;
using Bhavna.Web.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Bhavna.Web.API.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDBContext _dbcontext;
        public ProductRepository(ApplicationDBContext _dbcontext)
        {
            this._dbcontext = _dbcontext ?? throw new ArgumentNullException(nameof(_dbcontext));

        }

       public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            try
            {
                return await _dbcontext.products.ToListAsync();
            }
            catch (Exception ex)
            {
                throw;
            }
          
        }
    }
   
}
