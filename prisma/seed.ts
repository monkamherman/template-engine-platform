import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create sample users
  const user1 = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      email: 'john.doe@example.com',
      name: 'John Doe',
      profile: {
        create: {
          bio: 'Full-stack developer and tech enthusiast',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        },
      },
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'jane.smith@example.com' },
    update: {},
    create: {
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      profile: {
        create: {
          bio: 'Designer and creative thinker',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
        },
      },
    },
  });

  console.log('✅ Created users:', { user1, user2 });

  // Create sample posts
  const post1 = await prisma.post.create({
    data: {
      title: 'Getting Started with Next.js 15',
      content: 'Next.js 15 brings amazing new features including improved performance, better developer experience, and more...',
      published: true,
      authorId: user1.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'Building Fullstack Apps with Prisma',
      content: 'Prisma makes database access easy and type-safe. Learn how to integrate it with Next.js...',
      published: true,
      authorId: user1.id,
    },
  });

  const post3 = await prisma.post.create({
    data: {
      title: 'Design Systems with TailwindCSS',
      content: 'Creating beautiful and consistent UIs with TailwindCSS and ShadCN/UI components...',
      published: false,
      authorId: user2.id,
    },
  });

  console.log('✅ Created posts:', { post1, post2, post3 });

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
