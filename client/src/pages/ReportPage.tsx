import { useTranslation } from "react-i18next";
import { useState } from 'react';
import apiClient from '../services/apiClient';
import SplitText from '../components/ui/SplitText';
import LoginButton from '../components/ui/LoginButton';

const ReportPage = () => {
  const { t } = useTranslation();
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('description', description);
      if (file) {
        formData.append('file', file);
      }
      
      // Mock location data (in real app, this would use geolocation)
      formData.append('lat', '13.0827');
      formData.append('lng', '80.2707');

      const response = await apiClient.post('/v1/reports', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setMessage('✅ Report submitted successfully! Our team will verify and process it shortly.');
      setDescription('');
      setFile(null);
      
      // Reset form
      const fileInput = document.getElementById('file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      setMessage('❌ Error submitting report. Please try again.');
      console.error('Error submitting report:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className=" relative pt-24 p-8 max-w-2xl mx-auto bg-dark-bg min-h-screen">
      
      <div className="absolute top-6 right-6">
        <LoginButton />
      </div>

      <SplitText
        text="Report Ocean Hazard"
        className="text-4xl md:text-5xl font-bold text-royal-gold mb-8"
        delay={80}
        duration={0.6}
        tag="h1"
        textAlign="center"
      />
      <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
        {t("homepage_about")}
      </p>
      <div className="bg-card border border-card-border rounded-lg p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="description" className="block text-card-foreground font-semibold mb-3">
              Description of Incident
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the ocean hazard you observed (e.g., oil spill, debris, unusual wildlife behavior, water quality issues...)"
              className="w-full h-32 px-4 py-3 bg-input border border-border rounded-lg 
                       text-foreground placeholder-muted-foreground
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                       resize-vertical"
              required
              data-testid="textarea-description"
            />
          </div>
          
          <div>
            <label htmlFor="file" className="block text-card-foreground font-semibold mb-3">
              Upload Evidence (Photo/Video)
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              accept="image/*,video/*"
              className="w-full px-4 py-3 bg-input border border-border rounded-lg 
                       text-foreground file:mr-4 file:py-2 file:px-4 
                       file:rounded-lg file:border-0 file:bg-primary 
                       file:text-primary-foreground file:font-semibold
                       hover:file:bg-primary/90"
              data-testid="input-file"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Accepted formats: JPG, PNG, MP4, MOV (max 10MB)
            </p>
          </div>

          <div className="bg-muted/20 border border-border rounded-lg p-4">
            <h3 className="text-card-foreground font-semibold mb-2">📍 Location Detection</h3>
            <p className="text-sm text-muted-foreground">
              Your device location will be automatically detected when you submit this report.
              This helps emergency responders locate the incident quickly.
            </p>
          </div>

          {message && (
            <div className={`p-4 rounded-lg border ${
              message.includes('✅') 
                ? 'bg-green-900/20 border-green-700 text-green-300' 
                : 'bg-red-900/20 border-red-700 text-red-300'
            }`}>
              {message}
            </div>
          )}
          
          <button
            type="submit"
            disabled={submitting || !description.trim()}
            className="w-full bg-primary text-primary-foreground px-6 py-4 rounded-lg 
                     font-semibold text-lg hover-elevate transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="button-submit-report"
          >
            {submitting ? 'Submitting Report...' : 'Submit Report'}
          </button>
        </form>
      </div>

      <div className="mt-12 space-y-4">
        <h2 className="text-2xl font-bold text-foreground text-center">Emergency Contacts</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-destructive/20 border border-destructive/50 rounded-lg p-4 text-center">
            <h3 className="font-bold text-destructive mb-2">🆘 Emergency Services</h3>
            <p className="text-destructive-foreground">Call 108 for immediate assistance</p>
          </div>
          <div className="bg-ocean-blue/20 border border-ocean-blue/50 rounded-lg p-4 text-center">
            <h3 className="font-bold text-ocean-blue mb-2">🌊 Coast Guard</h3>
            <p className="text-foreground">1554 for marine emergencies</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;