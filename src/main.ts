import { ApiExpress } from "./infra/api/express/api.express";
import { CreateProductRoute } from "./infra/api/express/routes/product/create-product.express";
import { ListaProductRoute } from "./infra/api/express/routes/product/list-product.express.route";
import { ProductRepositoryPrisma } from "./infra/repositories/product/product.repository.prisma";
import { prisma } from "./package/prisma/prisma";
import { CreateProductUsecase } from "./usecases/create-product/create-product.usecase";
import { ListProductUsecase } from "./usecases/list-product/list-procut.usecase";

function main() {
  const aRepository = ProductRepositoryPrisma.create(prisma);

  const createProductUsecase = CreateProductUsecase.create(aRepository);
  const listProdcutUsecase = ListProductUsecase.create(aRepository);

  const createRoute = CreateProductRoute.create(createProductUsecase);
  const listRoute = ListaProductRoute.create(listProdcutUsecase);

  const port = 8000;

  const api = ApiExpress.create([createRoute, listRoute]);

  api.start(port);
}

main();
