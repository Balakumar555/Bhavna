using Bhavna.Web.API.Models;

namespace Bhavna.Web.API.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<List<Product>> GetProductsPagination(int pageNumber, int pageSize );
    }
}
