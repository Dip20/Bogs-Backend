# only first time run this two command
npm install -g prisma
npx prisma init



# run this two command for migrate
npx prisma migrate dev --name init
npx prisma generate

