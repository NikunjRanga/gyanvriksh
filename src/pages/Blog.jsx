/**
 * Blog Page
 * Blog posts and articles about family wisdom, preservation, and technology
 */

import { Header, Footer } from '../components/layout';
import { Section, SectionTitle } from '../components/templates';
import { Container } from '../components/ui';

const Blog = () => {
  const blogPosts = [
    {
      title: 'The Importance of Preserving Family Stories',
      excerpt: 'Learn why capturing your family\'s oral history matters for future generations.',
      date: '2024-01-15',
    },
    {
      title: 'How AI is Revolutionizing Knowledge Preservation',
      excerpt: 'Discover how artificial intelligence helps organize and structure family wisdom.',
      date: '2024-01-10',
    },
    {
      title: 'Building Your Family Tree of Wisdom',
      excerpt: 'A step-by-step guide to starting your GyaanVriksh journey.',
      date: '2024-01-05',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Section background="gradient" padding="py-32">
          <div className="text-center max-w-4xl mx-auto">
            <SectionTitle title="Blog" size="large" />
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Stories, insights, and guides about preserving family wisdom
            </p>
          </div>
        </Section>

        <Section background="white">
          <Container>
            <div className="max-w-4xl mx-auto space-y-8">
              {blogPosts.map((post, index) => (
                <article
                  key={index}
                  className="bg-neutral-light p-6 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <button className="text-primary hover:text-primary-dark font-medium">
                      Read More →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;



