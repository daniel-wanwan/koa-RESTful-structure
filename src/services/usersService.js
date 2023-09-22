import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

class usersService {
    async getUserInfoByAccount(account, password) {
        return await prisma.user
            .findMany({
                where: {
                    account,
                    password,
                },
            })
            .finally(async () => {
                await prisma.$disconnect()
            })
    }
}

export default new usersService()
