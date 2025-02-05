// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "admin@example.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         // Hardcoded admin user (Replace this with a database lookup)
//         const adminUser = {
//           id: "1",
//           name: "Admin",
//           email: "admin@example.com",
//           password: "admin123",
//         };

//         if (
//           credentials?.email === adminUser.email &&
//           credentials?.password === adminUser.password
//         ) {
//           return { id: adminUser.id, name: adminUser.name, email: adminUser.email };
//         }

//         throw new Error("Invalid email or password");
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }: { token: any, user?: any }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }: { session: any, token: any }) {
//       if (session.user) {
//         session.user.id = token.id as string; // Attach user ID to session
//       }
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET, // Add this in your .env file
//   pages: {
//     signIn: "/admin/login", // Redirect to custom login page
//   },
// });

// export { handler as GET, handler as POST };







import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Hardcoded admin user (Replace this with a database lookup)
        const adminUser = {
          id: "1",
          name: "Admin",
          email: "admin@example.com",
          password: "admin123",
        };

        if (
          credentials?.email === adminUser.email &&
          credentials?.password === adminUser.password
        ) {
          return { id: adminUser.id, name: adminUser.name, email: adminUser.email };
        }

        throw new Error("Invalid email or password");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string, // Ensure token.id exists
        },
      };
    }
    
    // async session({ session, token }) {
    //   if (session.user) {
    //     session.user.id = token.id as string; // Attach user ID to session
    //   }
    //   return session;
    // },
  },
  secret: process.env.NEXTAUTH_SECRET, // Add this in your .env file
  pages: {
    signIn: "/admin/login", // Redirect to custom login page
  },
});

export { handler as GET, handler as POST };


