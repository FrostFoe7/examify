export async function getStats() {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/stats`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch stats");
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {
      usersCount: 0,
      examsCount: 0,
      batchesCount: 0,
      questionsCount: 0,
    };
  }
}

export async function getLiveBatches() {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/batches`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch batches");
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error fetching batches:", error);
    return [];
  }
}

export async function getPublicExams() {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/public-exams`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch public exams");
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error fetching public exams:", error);
    return [];
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/blog/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error("Failed to fetch blog post");
    }
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error(`Error fetching blog post (${slug}):`, error);
    return null;
  }
}

interface LoginData {
  identifier: string;
  password: string;
}

interface RegisterData {
  name: string;
  roll_number: string;
  phone?: string;
  password?: string;
}

export async function login(data: LoginData) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.error("Login API error:", error);
    return { status: 'error', message: 'Something went wrong. Please try again later.' };
  }
}

export async function register(data: RegisterData) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.error("Register API error:", error);
    return { status: 'error', message: 'Something went wrong. Please try again later.' };
  }
}
