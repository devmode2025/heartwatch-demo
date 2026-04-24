# HeartWatch MCS Dashboard

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

🏥 **A real-time medical monitoring dashboard for Abbott HeartMate 3 LVAD patients**

## 🌐 Live Demo

- **Custom Domain:** https://demo.heartwatch.dev
- **GitHub Pages:** https://devmode2025.github.io/heartwatch-demo/

## 📋 Overview

HeartWatch MCS Dashboard is a professional Angular 17 application demonstrating real-time patient monitoring for mechanical circulatory support (MCS) devices. Built with modern web technologies, it showcases healthcare-specific UI/UX patterns and state management.

### ✨ Current Features

- 📊 **Real-time Vitals Monitoring** - Heart rate, blood pressure, temperature, SpO2 (updates every 5 seconds)
- 🚨 **Alert Banner System** - Critical and warning alerts with acknowledge/dismiss functionality
- 💉 **Patient Summary** - Demographics, medical record, assigned physician
- 🔋 **Device Status** - Battery level, pump speed, flow rate monitoring
- 🎨 **Responsive Design** - Mobile, tablet, and desktop optimized
- 🟢🟡🔴 **Color-coded Thresholds** - Visual status indicators for clinical values
- ⚡ **Fast Performance** - Optimized bundle (~89 KB gzipped)

### 🛠️ Technical Stack

- **Framework:** Angular 17.3 (Standalone Components)
- **Build Tool:** NX 18 (Monorepo)
- **State Management:** NgRx 17 (Store, Effects, Selectors)
- **Reactive Programming:** RxJS
- **Language:** TypeScript
- **Styling:** SCSS with CSS Grid
- **Deployment:** GitHub Pages with custom domain

## 🚀 Quick Start

### Development Server

```bash
npm start
# or
npx nx serve heartwatch-demo
```

Navigate to http://localhost:4200/ (or http://localhost:4201/ if 4200 is in use)

### Build for Production

```bash
npx nx build --configuration=production
```

Build artifacts are stored in `dist/heartwatch-demo/browser/`

### Deploy to GitHub Pages

```bash
# Build
npx nx build --configuration=production

# Copy CNAME
Copy-Item CNAME dist/heartwatch-demo/browser/

# Deploy
npx gh-pages -d dist/heartwatch-demo/browser -b gh-pages
```

See `DEPLOYMENT.md` for detailed deployment instructions.

## 📁 Project Structure

```
src/
+-- app/
¦   +-- core/
¦   ¦   +-- models/          # Data models (Patient, Vitals, Device, Alert)
¦   ¦   +-- services/        # Mock data service with real-time stream
¦   +-- store/
¦   ¦   +-- device/          # Device state (NgRx)
¦   ¦   +-- patient/         # Patient & vitals state (NgRx)
¦   ¦   +-- alerts/          # Alerts & notes state (NgRx)
¦   +-- dashboard/
¦   ¦   +-- patient-summary/ # Patient info component
¦   ¦   +-- device-status/   # Device metrics component
¦   ¦   +-- vitals-panel/    # Real-time vitals component
¦   +-- shared/
¦       +-- components/
¦           +-- alert-banner/ # Alert notification system
```

## 🔧 Architecture

### State Management Flow

1. **MockDataService** generates vitals every 5 seconds via RxJS `interval()`
2. **Dashboard Component** subscribes and dispatches actions to NgRx
3. **Effects** check thresholds and generate alerts
4. **Selectors** provide reactive data to components
5. **Components** render with OnPush change detection

### Clinical Thresholds

**Heart Rate:**
- Normal: 50-130 bpm
- Warning: <50 or >130 bpm
- Critical: <40 or >150 bpm

**Blood Pressure:**
- Normal: <160/<100 mmHg
- Warning: =160/=100 mmHg
- Critical: =180/=110 mmHg

**Device Battery:**
- Normal: >30%
- Warning: <30%
- Critical: <15%

## 🔮 Future Features

### Phase 4: Data Visualization
**Priority: P1**

- 📈 **ECharts Integration** - Professional line charts for vital signs trends
  - Multi-series support (HR, BP, Temp on same graph)
  - Smooth animations and transitions
- ⏱️ **Time Range Selector** - 1hr / 8hr / 24hr views
  - Dynamic data loading based on selected range
  - Zoom and pan capabilities
- 📊 **Interactive Features**
  - Tooltips showing exact values on hover
  - Legend toggle to show/hide series
  - Export chart as image
- 🔄 **Real-time Updates** - Chart updates as new data arrives
  - Smooth data point addition
  - Automatic axis rescaling

**Implementation:**
```typescript
// Install ECharts
npm install echarts ngx-echarts@17

// Add to app.config.ts
provideEcharts()

// Create trend-chart component with historical data from MockDataService
```

---

### Phase 5: Interactive Features
**Priority: P2**

- 📝 **Add Patient Notes Modal**
  - Reactive forms with validation
  - Note type selector (Clinical, Administrative, Alert Response)
  - Rich text input with character counter
- 📋 **Notes List Component**
  - Display recent notes (latest 10)
  - Filter by note type
  - Timestamp and author information
- ✏️ **Form Validation**
  - Required fields (note text, type)
  - Max length validation (500 characters)
  - Custom validators for medical terminology
- 💾 **Persistence**
  - Save notes to NgRx alerts store
  - Link notes to specific alerts
  - Export notes history
- 🕐 **Metadata Tracking**
  - Created timestamp
  - Author/clinician name
  - Related alert ID

**Implementation:**
```typescript
// Notes interface
interface Note {
  id: string;
  patientId: string;
  type: 'clinical' | 'administrative' | 'alert_response';
  text: string;
  authorName: string;
  createdAt: Date;
  relatedAlertId?: string;
}

// Add to alerts.actions.ts
export const addNote = createAction(
  '[Alerts] Add Note',
  props<{ note: Omit<Note, 'id' | 'createdAt'> }>()
);
```

---

### Phase 6: Testing & Polish
**Priority: P1**

- ✅ **Unit Tests**
  - Component tests with TestBed
  - Service tests with mock data
  - Reducer tests for state mutations
  - Selector tests for memoization
  - Target: 80%+ code coverage
  
- 🧪 **Integration Tests**
  - NgRx effects testing with marble diagrams
  - End-to-end data flow tests
  - Mock HTTP requests for future API integration
  
- 🎨 **UI Polish**
  - Smooth animations for alerts (slide in/out)
  - Vitals card flip animations
  - Loading skeleton screens
  - Micro-interactions (button hover states, ripples)
  
- 🔄 **Loading States**
  - Spinner during initial data load
  - Skeleton loaders for vitals/device
  - Progress indicators for notes submission
  
- ⚠️ **Error Handling**
  - Graceful error boundaries
  - Retry mechanisms for failed data loads
  - User-friendly error messages
  - Fallback UI components
  
- 📱 **Mobile Optimization**
  - Touch-friendly tap targets (min 44x44px)
  - Swipe gestures for alert dismissal
  - Optimized layouts for small screens
  - Bottom sheet for notes modal on mobile
  
- ♿ **Accessibility**
  - ARIA labels for all interactive elements
  - Keyboard navigation support (Tab, Enter, Escape)
  - Screen reader announcements for alerts
  - Color contrast compliance (WCAG AA)
  - Focus management for modals

**Testing Commands:**
```bash
# Unit tests
npx nx test heartwatch-demo

# E2E tests
npx nx e2e heartwatch-demo-e2e

# Coverage report
npx nx test heartwatch-demo --coverage
```

---

### 

These enhancements would transform the demo into a production-ready application with:
- Professional data visualization capabilities
- Complete clinical workflow support
- Enterprise-grade quality and reliability

## 📚 Documentation

- **DEPLOYMENT.md** - Detailed deployment guide
- **DEV_PLAN.md** - Original development roadmap (if exists)

## 🤝 Contributing

This is a demo project for interview purposes. Not open for contributions.

## 📄 License

MIT License - See LICENSE file for details

## 👤 Author

Built for Abbott medical device interview demonstration

---

## Connect with us!

- [Join the Nx community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow Nx on Twitter](https://twitter.com/nxdevtools)
