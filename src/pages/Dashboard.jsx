/**
 * Dashboard Page
 * Main dashboard for recording and managing stories (Phase 3)
 */

import { useNavigate } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import { Section, SectionTitle } from '../components/templates';
import { Container } from '../components/ui';
import { Button } from '../components/ui';
import { Mic, Video, Upload, BookOpen } from 'lucide-react';
import StoriesPreview from '../components/stories/StoriesPreview';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Section background="gradient" padding="py-20">
          <div className="text-center max-w-4xl mx-auto">
            <SectionTitle title="Your Family Wisdom Dashboard" size="large" />
            <p className="text-lg text-gray-600 leading-relaxed">
              Start capturing and preserving your family's stories
            </p>
          </div>
        </Section>

        <Section background="white">
          <Container>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <button
                onClick={() => navigate('/record')}
                className="bg-neutral-light p-6 rounded-xl hover:shadow-lg transition-all text-center group"
              >
                <Mic className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Record Audio</h3>
                <p className="text-sm text-gray-600">Capture voice stories</p>
              </button>

              <button
                onClick={() => navigate('/record')}
                className="bg-neutral-light p-6 rounded-xl hover:shadow-lg transition-all text-center group"
              >
                <Video className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Record Video</h3>
                <p className="text-sm text-gray-600">Capture video stories</p>
              </button>

              <button
                onClick={() => navigate('/record')}
                className="bg-neutral-light p-6 rounded-xl hover:shadow-lg transition-all text-center group"
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Upload Media</h3>
                <p className="text-sm text-gray-600">Upload existing files</p>
              </button>

              <button
                onClick={() => navigate('/stories')}
                className="bg-neutral-light p-6 rounded-xl hover:shadow-lg transition-all text-center group"
              >
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">View Stories</h3>
                <p className="text-sm text-gray-600">Browse your collection</p>
              </button>
            </div>

            {/* Recent Stories Preview */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Recent Stories</h3>
                <Button variant="outline" onClick={() => navigate('/stories')}>
                  View All
                </Button>
              </div>
              <StoriesPreview />
            </div>

            <div className="bg-neutral-light rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Start Recording?
              </h3>
              <p className="text-gray-600 mb-6">
                Choose an option above to begin capturing your family's wisdom
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/record')}
              >
                Get Started
              </Button>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

