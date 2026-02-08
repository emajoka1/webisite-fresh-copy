import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";
import type { QuoteDraft, QuoteDraftStatus } from "./quote-workflow";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createQuoteDraft(draft: Omit<QuoteDraft, "id">): Promise<QuoteDraft>;
  getQuoteDraft(id: string): Promise<QuoteDraft | undefined>;
  listQuoteDrafts(): Promise<QuoteDraft[]>;
  updateQuoteDraftStatus(
    id: string,
    status: QuoteDraftStatus,
    updates?: Partial<Pick<QuoteDraft, "reviewError" | "reviewProviderId" | "quoteLetter">>,
  ): Promise<QuoteDraft | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quoteDrafts: Map<string, QuoteDraft>;

  constructor() {
    this.users = new Map();
    this.quoteDrafts = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createQuoteDraft(draft: Omit<QuoteDraft, "id">): Promise<QuoteDraft> {
    const id = randomUUID();
    const record: QuoteDraft = { ...draft, id };
    this.quoteDrafts.set(id, record);
    return record;
  }

  async getQuoteDraft(id: string): Promise<QuoteDraft | undefined> {
    return this.quoteDrafts.get(id);
  }

  async listQuoteDrafts(): Promise<QuoteDraft[]> {
    return Array.from(this.quoteDrafts.values()).sort((a, b) =>
      a.submittedAtIso < b.submittedAtIso ? 1 : -1,
    );
  }

  async updateQuoteDraftStatus(
    id: string,
    status: QuoteDraftStatus,
    updates?: Partial<Pick<QuoteDraft, "reviewError" | "reviewProviderId" | "quoteLetter">>,
  ): Promise<QuoteDraft | undefined> {
    const existing = this.quoteDrafts.get(id);
    if (!existing) return undefined;
    const updated: QuoteDraft = {
      ...existing,
      status,
      reviewError: updates?.reviewError ?? existing.reviewError,
      reviewProviderId: updates?.reviewProviderId ?? existing.reviewProviderId,
      quoteLetter: updates?.quoteLetter ?? existing.quoteLetter,
    };
    this.quoteDrafts.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
