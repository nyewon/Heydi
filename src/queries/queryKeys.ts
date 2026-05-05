export const queryKeys = {
  auth: {
    user: ["auth", "user"],
  },

  user: {
    me: ["user", "me"],
    mypage: ["user", "mypage"],
    shared: (page: number) => ["user", "shared", page],
    liked: ["user", "liked"],
  },

  community: {
    posts: ["community", "posts"],
    post: (id: number) => ["community", "post", id],
    comments: (id: number) => ["community", "comments", id],
  },

  diary: {
    list: ["diary", "list"],
    detail: (id: number) => ["diary", "detail", id],
    conversation: (id: number) => ["diary", "conversation", id],
  },

  report: {
    monthly: (ym: string) => ["report", "monthly", ym],
    calendar: (ym: string) => ["report", "calendar", ym],
    topics: (ym: string) => ["report", "topics", ym],
    emotions: (ym: string) => ["report", "emotions", ym],
  },
};
