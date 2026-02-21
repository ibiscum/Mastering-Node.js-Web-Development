export type Session = {
  id: string;
  data: { [key: string]: string | number | boolean | null };
};

export interface SessionRepository {
  createSession(): Promise<Session>;

  getSession(id: string): Promise<Session | undefined>;

  saveSession(session: Session, expires: Date): Promise<void>;

  touchSession(session: Session, expires: Date): Promise<void>;
}
