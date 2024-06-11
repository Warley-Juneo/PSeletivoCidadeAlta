import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const emblems = [
    {
      id: 1,
      slug: 'cda',
      name: 'Cidade Alta',
      image: 'https://cidadealtarp.com/imagens/challenge/cidade-alta.png',
    },
    {
      id: 2,
      slug: 'cda-valley',
      name: 'Cidade Alta Valley',
      image:
        'https://cidadealtarp.com/imagens/challenge/cidade-alta-valley.png',
    },
    {
      id: 3,
      slug: 'policia',
      name: 'Policia do Cidade Alta',
      image: 'https://cidadealtarp.com/imagens/challenge/policia.png',
    },
    {
      id: 4,
      slug: 'hospital',
      name: 'Hospital do Cidade Alta',
      image: 'https://cidadealtarp.com/imagens/challenge/hospital.png',
    },
    {
      id: 5,
      slug: 'mecanica',
      name: 'Mecânica do Cidade Alta',
      image: 'https://cidadealtarp.com/imagens/challenge/mecanica.png',
    },
    {
      id: 6,
      slug: 'taxi',
      name: 'Taxi do Cidade Alta',
      image: 'https://cidadealtarp.com/imagens/challenge/taxi.png',
    },
    {
      id: 7,
      slug: 'curuja',
      name: 'Coruja do Cidade Alta',
      image: 'https://cidadealtarp.com/imagens/challenge/coruja.png',
    },
    {
      id: 8,
      slug: 'hiena',
      name: 'Hiena do Cidade Alta',
      image: 'https://cidadealtarp.com/imagens/challenge/hiena.png',
    },
    {
      id: 9,
      slug: 'gato',
      name: 'Gato do Cidade Alta',
      image: 'https://cidadealtarp.com/imagens/challenge/gato.png',
    },
    {
      id: 10,
      slug: 'urso',
      name: 'Urso do Cidade Alta',
      image: 'https://cidadealtarp.com/imagens/challenge/urso.png',
    },
  ];

  for (const emblem of emblems) {
    await prisma.emblem.create({
      data: emblem,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
