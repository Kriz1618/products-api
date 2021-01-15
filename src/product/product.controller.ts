import { Controller, Get, Post, Put, Delete, Res,  HttpStatus, Body, Param, Query, NotFoundException } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
import to from 'await-to-js';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}
    
    @Post('/create')
    async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
        const [err, product] = await to(this.productService.createProduct(createProductDTO));
        
        if (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({ error: `${err}`});
        }

        return res.status(HttpStatus.OK).json({
            message: 'Product was successfully created!!',
            product: product
        });
    }

    @Get('/')
    async getProducts(@Res() res) {
        const [err, products] = await to(this.productService.getProducts());
        
        if (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({ error: `${err}`});
        }

        return res.status(HttpStatus.OK).json({
            message: `${products.length} products were found`,
            products
        });
    }

    @Get('/:productId')
    async getProduct(@Res() res, @Param('productId') productId) {
        console.log('41 id', productId);
        const [err, product] = await to(this.productService.getProduct(productId));
        
        if (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({ error: `${err}`});
        }

        if (!product) {
            throw new NotFoundException('Product does not exists');
        }

        return res.status(HttpStatus.OK).json({
            message: `Product ${productId} was found`,
            product
        });
    }

    @Put('/update')
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('productId') productId) {
        const [err, product] = await to(this.productService.updateProduct(productId, createProductDTO));

        if (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({ error: `${err}`});
        }

        if (!product) {
            throw new NotFoundException('Product does not exists');
        }

        return res.status(HttpStatus.OK).json({
            message: `Product ${product.name || productId} was updated`,
            product
        });

    }

    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productId') productId) {
        const [err, product] = await to(this.productService.deleteProduct(productId));

        if (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({ error: `${err}`});
        }

        if (!product) {
            throw new NotFoundException('Product does not exists');
        }

        return res.status(HttpStatus.OK).json({
            message: `Product ${productId} was deleted`,
            product
        });
    }


}
