$files = Get-ChildItem -Path "backend/src/routes/*.ts", "backend/src/controllers/*.ts" -Recurse
foreach ($file in $files) {
    (Get-Content $file.FullName) | ForEach-Object {
        $_ -replace "import { prisma } from '../index';", "import { prisma } from '../lib/prisma';" `
           -replace "import { prisma, io } from '../index';", "import { prisma } from '../lib/prisma';`nimport { io } from '../index';"
    } | Set-Content $file.FullName
}
