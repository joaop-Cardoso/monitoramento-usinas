import { PrismaClient } from "@prisma/client";
class PrismaClientSingleton {

  private static instance: PrismaClient;
  private constructor() {}

  public static getInstance(): PrismaClient {

    if (!PrismaClientSingleton.instance) {
      PrismaClientSingleton.instance = new PrismaClient({ errorFormat: "pretty" });

    }
    return PrismaClientSingleton.instance;
  }
}

const prisma = PrismaClientSingleton.getInstance();

export default prisma;