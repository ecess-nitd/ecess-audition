# ECESS Audition 2025  
ECESS Audition 2025 is an audition registration platform for ECESS (Electronics and Communication Engineering Students Society) at NIT Durgapur, built with Next.js and Supabase.  

### Features  
- Next.js 14 with the App Router  
- Supabase as the backend database  
- Tailwind CSS for styling  
- Secure form submission with validation  
- Rate limiting for form submissions  
- Responsive design for all devices  

## Getting Started  

### 1. Clone the Repository  
```bash
git clone https://github.com/yourusername/ecess-audition.git
cd ecess-audition
```

### 2. Install Dependencies  
```bash
npm install
# or
yarn install
```

### 3. Start the Development Server  
```bash
npm run dev
```
The application will be available at:  
[http://localhost:3000](http://localhost:3000)  

## Setting Up Supabase  

### 1. Create a Supabase Project  
1. Go to [Supabase](https://supabase.com) and sign in.  
2. Create a new project and note down the **Project URL** and **API Key**.  

### 2. Set Up the Database Schema  
Navigate to **Database → SQL Editor** in Supabase and run the following SQL query to create the required table:  

```sql
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  domain TEXT[] NOT NULL,
  gender TEXT NOT NULL,
  cgpa NUMERIC(3,2) NOT NULL,
  roll_number TEXT NOT NULL,
  performance TEXT
);
```

This table will store audition registrations.

## Configuring the Environment Variables  

Create a `.env.local` file in the root directory of the project and add the following environment variables:  

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Note:**  
- `NEXT_PUBLIC_SUPABASE_URL` should be your Supabase project URL.  
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` should be the Supabase anonymous API key.  
- Do not expose your **Supabase service role key** in the frontend.  

## Form Fields

The audition registration form includes the following fields:
- **Name**: Full name of the participant
- **Email**: Contact email address
- **Phone**: 10-digit phone number
- **Domain**: Technical domains of expertise - multiple selection allowed (Web Development, Embedded Systems, Event Management, Video Editing, Graphic Designing)
- **Gender**: Gender selection (Male, Female, Others)
- **CGPA**: Current CGPA (5.00-10.00)
- **Roll Number**: Student roll number (max 8 characters)
- **Performance**: Description of technical skills or projects you can contribute (optional, max 500 characters)

## Deployment  

### Deploying on Vercel  
To deploy the application on Vercel:  
1. Push the code to GitHub.  
2. Go to [Vercel](https://vercel.com), import the repository, and configure the **environment variables** under **Settings → Environment Variables**.  
3. Click **Deploy** to publish the application.  

## License  
This project is licensed under the **MIT License**.

## Contributing  
Contributions are welcome. To contribute, fork the repository, create a new branch, and submit a pull request.