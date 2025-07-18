import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ProductComponent implements OnInit, AfterViewInit {
  @ViewChild('ratingChart') chartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('avgChart') avgChartRef!: ElementRef<HTMLCanvasElement>; // ✅ Add this

  chart: Chart | null = null;
  avgChart: Chart | null = null;

  products: Product[] = [];
  filteredProducts: Product[] = [];

  pageSize = 10;
  currentPage = 1;
  searchTerm: string = '';
  sortColumn: keyof Product = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  Math = Math;

  constructor(private productsService: ProductService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data || [];
        this.applyFilterSort();
        setTimeout(() => {
          this.createStackedBarChart(this.filteredProducts);
        }, 500);
      },
      error: (err) => {
        console.error('Error loading products', err);
      },
    });
  }

  applyFilterSort(): void {
    let result = [...this.products];

    if (this.searchTerm) {
  const term = this.searchTerm.toLowerCase();
  result = result.filter((p) =>
    (p.name && p.name.toLowerCase().includes(term)) ||
    (p.description && p.description.toLowerCase().includes(term)) ||
    (p.price && String(p.price).includes(term)) ||
    (p.salePrice && String(p.salePrice).includes(term)) ||
    (p.stockQuantity && String(p.stockQuantity).includes(term)) ||
    (p.category && p.category.toLowerCase().includes(term)) ||
    (p.brand && p.brand.toLowerCase().includes(term)) ||
    (p.rating && p.rating.toLowerCase().includes(term))
  );
}

    result.sort((a, b) => {
      const valA = a[this.sortColumn];
      const valB = b[this.sortColumn];

      if (valA == null || valB == null) return 0;

      return this.sortDirection === 'asc'
        ? valA > valB
          ? 1
          : -1
        : valA < valB
        ? 1
        : -1;
    });

    this.filteredProducts = result;
    this.currentPage = 1;
  }

  createStackedBarChart(products: Product[]): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    const canvas = this.chartRef?.nativeElement;
    if (!canvas) {
      console.warn('Chart canvas not found');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const ratingGroups = this.groupByRatingAndCategory(products);

    const categories = [
      ...new Set(
        products.map((p) => p.category).filter((c): c is string => !!c)
      ),
    ];

    const intRatings = products
      .map((p) => parseFloat(p.rating ?? 'NaN'))
      .filter((r) => !isNaN(r))
      .map((r) => Math.floor(r));

    const uniqueIntRatings = [...new Set(intRatings)].sort((a, b) => a - b);

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: uniqueIntRatings.map((r) => r.toString()),
        datasets: categories.map((category) => ({
          label: category,
          data: uniqueIntRatings.map((rating) => {
            const ratingKey = rating.toString();
            return ratingGroups[ratingKey]?.[category]?.length || 0;
          }),
          backgroundColor: this.getRandomColor(),
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Products by Rating Group' },
        },
        scales: {
          x: {
            stacked: true,
            title: { display: true, text: 'Rating Group (Floored)' },
          },
          y: {
            stacked: true,
            title: { display: true, text: 'Number of Products' },
          },
        },
      },
    };

    this.chart = new Chart(ctx, config);
  }

  // ✅ New method for average ratings
  createAverageBarChart(products: Product[]): void {
    if (this.avgChart) {
      this.avgChart.destroy();
      this.avgChart = null;
    }

    const canvas = this.avgChartRef?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const grouped: Record<number, number[]> = {};

    products.forEach((p) => {
      const rating = parseFloat(p.rating ?? 'NaN');
      if (!isNaN(rating)) {
        const group = Math.floor(rating);
        if (!grouped[group]) grouped[group] = [];
        grouped[group].push(rating);
      }
    });

    const groups = Object.entries(grouped)
      .map(([key, values]) => {
        const avg = values.reduce((sum, r) => sum + r, 0) / values.length;
        return {
          group: parseInt(key),
          count: values.length,
          average: parseFloat(avg.toFixed(2)),
        };
      })
      .sort((a, b) => a.group - b.group);

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: groups.map((g) => `Group ${g.group}`),
        datasets: [
          {
            label: 'Avg Rating',
            data: groups.map((g) => g.average),
            backgroundColor: 'orange',
          },
          {
            label: 'Product Count',
            data: groups.map((g) => g.count),
            backgroundColor: 'steelblue',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: 'Avg Rating & Count per Group' },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Value' },
          },
        },
      },
    };

    this.avgChart = new Chart(ctx, config);
  }

  private groupByRatingAndCategory(
    products: Product[]
  ): Record<string, Record<string, Product[]>> {
    return products.reduce((groups, product) => {
      const rawRating = parseFloat(product.rating ?? 'NaN');
      const rating = isNaN(rawRating)
        ? 'Unrated'
        : Math.floor(rawRating).toString();
      const category = product.category ?? 'Uncategorized';

      if (!groups[rating]) groups[rating] = {};
      if (!groups[rating][category]) groups[rating][category] = [];

      groups[rating][category].push(product);
      return groups;
    }, {} as Record<string, Record<string, Product[]>>);
  }

  private getRandomColor(): string {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(5, '0')}`;
  }

  get pagedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredProducts.slice(start, start + this.pageSize);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  changeSort(column: keyof Product): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilterSort();
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.applyFilterSort();
  }
}
