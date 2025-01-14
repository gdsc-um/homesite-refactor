# Homesite Refactor 2025

🚀 **Homesite Refactor** is a full-stack web application for GDGoC UM, designed to provide an improved, feature-rich, and scalable platform.

## 🛠 Features

* Upgraded to Next.js 15 with TypeScript.
* Backend integration using Prisma ORM.
* User authentication with `next-auth`.
* Admin panel for managing users and data.
* Responsive UI with modern design.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

* [Node.js](https://nodejs.org/) v20+ (LTS recommended)
* [pnpm](https://pnpm.io/) (Preferred package manager)
* [MySQL](https://www.mysql.com/) (or any database supported by Prisma)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/gdsc-um/homesite-refactor.git
cd homesite-refactor
```

### 2. Install Dependencies

Using `pnpm` for package management:

```bash
pnpm install
```

### 3. Set Up the Backend

#### Create Database

1. Access your MySQL instance using a client (e.g., MySQL Workbench, phpMyAdmin, or the command line).

2. Run the following SQL command to create a database:
```sql
CREATE DATABASE homesite_refactor;  
```
Replace homesite_refactor with your preferred database name.

3. Create a database user and grant privileges (optional):
```sql
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';  
GRANT ALL PRIVILEGES ON homesite_refactor.* TO 'username'@'localhost';  
FLUSH PRIVILEGES;  
```
Replace username and password with your desired credentials.


#### Configure Environment Variables

Create a `.env` file in the root directory and add the following configuration:

```bash
DATABASE_URL="mysql://username:password@host:port/database"
NEXTAUTH_SECRET="your-secret-key"
NEXT_PUBLIC_API_BASE_URL="http://example.com"
NEXT_PUBLIC_QUIZ_SECRET="your-secret-key"
```

Replace placeholders with your database credentials and NextAuth settings.

#### Initialize Prisma

1. Generate the Prisma client:

   ```bash
   pnpm prisma generate
   ```
2. Run database migrations:

   ```bash
   pnpm prisma migrate dev
   ```

   This command applies schema changes and updates the database.
3. (Optional) Seed the database:
   Check `prisma/seed.ts` file for seeding the database, then run:

   ```bash
   pnpm prisma db seed
   ```

---

### 4. Run the Application

Start the development server:

```bash
pnpm next dev
```

Visit the app at [http://localhost:3000](http://localhost:3000).


## 🛠 Development Tools

### Scripts

| Command                                           | Description                                 |
| ------------------------------------------------- | ------------------------------------------- |
| `pnpm next dev`                                 | Start the development server                |
| `pnpm next build`                               | Build the project for production            |
| `pnpm nextstart`                                | Start the production server                 |
| `pnpm prisma generate`                          | Generate Prisma client                      |
| `pnpm prisma migrate dev`                       | Apply migrations in development             |
| `pnpm prisma migrate dev --name migration-name` | Update Prisma schema in `schema.prisma.` |

### Libraries & Tools

* **Framework** : [Next.js](https://nextjs.org/)
* **Database** : [Prisma ORM](https://www.prisma.io/), MySQL
* **Styling** : Tailwind CSS, Shadcn UI
* **Authentication** : `next-auth`
* **TypeScript** : Strict typing for maintainability

---

## 🤝 Contribution Guide

* Fork the repository.
* Create a feature branch (`git checkout -b feature-branch-name`).
* Commit your changes (`git commit -m 'Add some feature'`).
* Push to the branch (`git push origin feature-branch-name`).
* Open a pull request.

### Commit Messages

Use  **Conventional Commits** :

* `feat`: A new feature (e.g., `feat: add admin dashboard`).
* `fix`: A bug fix (e.g., `fix: correct user role validation`).
* `chore`: Changes to build or dependencies (e.g., `chore: update Tailwind CSS`).
* `docs`: Documentation updates (e.g., `docs: update README for setup`).
* `refactor`: Code refactoring (e.g., `refactor: optimize middleware logic`).
* `test`: Adding or updating tests (e.g., `test: add tests for middleware`).

## 📜 License

This project is licensed under the **[Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)]()** license.
