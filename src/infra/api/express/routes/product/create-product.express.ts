import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import {
  CreateProductInputDto,
  CreateProductUsecase,
} from "./../../../../../usecases/create-product/create-product.usecase";

export type CreateProdctResponseDto = {
  id: string;
};

export class CreateProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly CreateProductService: CreateProductUsecase
  ) {}

  public static create(CreateProductService: CreateProductUsecase) {
    return new CreateProductRoute(
      "/products",
      HttpMethod.POST,
      CreateProductService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const { name, price } = request.body;

      const input: CreateProductInputDto = {
        name,
        price,
      };

      const output: CreateProdctResponseDto =
        await this.CreateProductService.execute(input);

      const responseBody = this.present(output);

      response.status(201).json(responseBody).send();
    };
  }

  public getPath(): string {
    return this.path;
  }

 public getMethod(): HttpMethod {
      return this.method
  }

  private present(input: CreateProdctResponseDto): CreateProdctResponseDto {
    const response = { id: input.id };
    return response;
  }
}
