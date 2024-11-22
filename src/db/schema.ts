import { UploadedFile } from "@/types"
import { createId } from "@paralleldrive/cuid2"
import { relations, sql } from "drizzle-orm"
import {
  bigint,
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core"
import { AdapterAccount } from "next-auth/adapters"

// Users table
export const users = pgTable(
  "user",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar("name", { length: 255 }),
    username: varchar("username", { length: 255 }),
    bio: varchar("bio", { length: 255 }).default(""),
    email: varchar("email", { length: 255 }).notNull(),
    emailVerified: timestamp("emailVerified", {
      withTimezone: true,
    }).default(sql`CURRENT_TIMESTAMP`),
    image: varchar("image", { length: 255 }),
  },
  (table) => ({
    usernameIdx: index("username_idx").on(table.username),
  })
)

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  posts: many(posts),
  comments: many(comments),
  likes: many(likes),
  follower: many(follows, { relationName: "follower" }),
  following: many(follows, { relationName: "following" }),
}))

// Accounts table
export const accounts = pgTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("userId_idx").on(account.userId),
  })
)

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}))

// Sessions table
export const sessions = pgTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { withTimezone: true }).notNull(),
  },
  (session) => ({
    userIdIdx: index("userId_idx").on(session.userId),
  })
)

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}))

// Verification tokens table
export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { withTimezone: true }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
)

// Posts table
export const posts = pgTable("post", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId())
    .notNull()
    .primaryKey(),
  content: text("content").notNull(),
  images: jsonb("images").$type<UploadedFile[] | null>().default(null),
  authorId: varchar("authorId", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
})

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  comments: many(comments),
  likes: many(likes),
}))

// Comments table
export const comments = pgTable("comment", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId())
    .notNull()
    .primaryKey(),
  content: text("content").notNull(),
  postId: varchar("postId", { length: 128 }).notNull(),
  authorId: varchar("authorId", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
})

export const commentsRelations = relations(comments, ({ one }) => ({
  posts: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
}))

// Likes table
export const likes = pgTable("likes", {
  id: varchar("id", { length: 128 })
    .$default(() => createId())
    .notNull()
    .primaryKey(),

  postId: varchar("postId", { length: 128 }).notNull(),
  userId: varchar("userId", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
})

export const likesRelations = relations(likes, ({ one }) => ({
  postId: one(posts, {
    fields: [likes.postId],
    references: [posts.id],
  }),
  userId: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
}))

// Follows table
export const follows = pgTable("follows", {
  follower: varchar("follower", { length: 255 }).notNull(),
  following: varchar("following", { length: 255 }).notNull(),
})

export const followsRelations = relations(follows, ({ one }) => ({
  follower: one(users, {
    fields: [follows.follower],
    references: [users.id],
    relationName: "follower",
  }),
  following: one(users, {
    fields: [follows.following],
    references: [users.id],
    relationName: "following",
  }),
}))

export type PostType = typeof posts.$inferSelect
export type CommentsType = typeof comments.$inferSelect
export type UserType = typeof users.$inferSelect & {
  isFollowed?: "0" | "1" | boolean
}
export type LikeType = typeof likes.$inferSelect

// types including relations

export type PostTypeWithRelations = PostType & {
  author: UserType
  comments?: CommentsType[]
  commentCount?: string
  likeCount?: string
  isLiked: "0" | "1"
}

export type CommentTypeWithRelations = CommentsType & {
  author: UserType
}
