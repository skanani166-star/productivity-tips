import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDV0PCcwFJNhvKaMZX_U7F87AqiB9lL7e4",
  authDomain: "productivity-tips-43f6b.firebaseapp.com",
  projectId: "productivity-tips-43f6b",
  storageBucket: "productivity-tips-43f6b.firebasestorage.app",
  messagingSenderId: "679495362656",
  appId: "1:679495362656:android:a69c25ade06fdd6160fb05",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const productivityData = [
  {
    category: "Focus Improvement",
    topics: [
      {
        title: "Deep Work",
        overview:
          "Deep work is the ability to focus without distraction on cognitively demanding tasks. It allows you to produce high-quality work in less time.",
        benefits: [
          "Improves concentration",
          "Increases productivity",
          "Reduces mental fatigue",
          "Enhances learning speed",
          "Builds strong problem solving skills",
        ],
        expertTip:
          "Schedule distraction-free blocks of time every day. Even one hour of deep focus can produce results that scattered work cannot.",
      },
      {
        title: "Avoid Multitasking",
        overview:
          "Multitasking divides your attention and reduces efficiency. Focusing on one task at a time helps complete work faster and with better quality.",
        benefits: [
          "Better task accuracy",
          "Reduced stress",
          "Improved efficiency",
          "Higher quality output",
        ],
        expertTip:
          "Single-tasking is the real productivity secret. Finish one task completely before starting another.",
      },
      {
        title: "Monotasking",
        overview:
          "The practice of dedicating oneself to a single task at a time, minimizing the performance cost of task switching.",
        benefits: [
          "Higher accuracy",
          "Faster completion times",
          "Deep immersion in logic",
          "Less cognitive load",
        ],
        expertTip:
          "Close your email client and messaging apps during focused work sessions. If it's urgent, they'll call.",
      },
      {
        title: "Digital Environment Cleanup",
        overview:
          "Organizing your files, desktop, and browser tabs to reduce visual noise and 'click-fatigue'.",
        benefits: [
          "Lower anxiety",
          "Faster file retrieval",
          "Clearer mental path",
          "Reduced distraction",
        ],
        expertTip:
          "Use 'OneTab' or similar tools to collapse your research tabs into a single list when you're done for the day.",
      },
    ],
  },
  {
    category: "Time Management",
    topics: [
      {
        title: "Daily Planning",
        overview:
          "Planning your day helps you stay organized and prevents wasting time deciding what to do next.",
        benefits: [
          "Improves productivity",
          "Reduces stress",
          "Creates clear priorities",
          "Helps track progress",
        ],
        expertTip:
          "Plan your next day before going to sleep. Starting the morning with a plan boosts clarity and confidence.",
      },
      {
        title: "Pomodoro Technique",
        overview:
          "The Pomodoro technique uses focused work sessions followed by short breaks to maintain energy and concentration.",
        benefits: [
          "Increases focus",
          "Prevents burnout",
          "Maintains mental freshness",
          "Improves time awareness",
        ],
        expertTip:
          "Work for 25 minutes, take a 5 minute break. After four sessions take a longer break.",
      },
      {
        title: "Time Blocking",
        overview:
          "Time blocking involves dividing your day into blocks of time, each dedicated to a specific task or group of tasks.",
        benefits: [
          "Visualizes daily capacity",
          "Reduces decision fatigue",
          "Ensures 'shallow work' doesn't take over",
          "Creates a sense of accomplishment",
        ],
        expertTip:
          "Color-code your calendar. Use one color for meetings, another for deep work, and a third for admin tasks.",
      },
      {
        title: "Eat the Frog",
        overview:
          "Identify your most difficult and important task (the frog) and complete it first thing in the morning.",
        benefits: [
          "Early sense of victory",
          "Prevents procrastination",
          "Higher energy levels",
          "Reduced evening stress",
        ],
        expertTip: "If you have to eat two frogs, eat the biggest one first.",
      },
      {
        title: "The 2-Minute Rule",
        overview:
          "If a task takes less than two minutes to complete, do it immediately instead of scheduling it for later.",
        benefits: [
          "Clears small items fast",
          "Reduces inbox bulk",
          "Prevents task pile-up",
          "Maintains momentum",
        ],
        expertTip: "Apply this to emails, cleaning up, and quick replies.",
      },
    ],
  },
  {
    category: "Work Efficiency",
    topics: [
      {
        title: "Task Prioritization",
        overview:
          "Prioritizing tasks ensures that important work gets completed first instead of spending time on less important activities.",
        benefits: [
          "Better productivity",
          "Reduced overwhelm",
          "Improved decision making",
          "Faster goal achievement",
        ],
        expertTip:
          "Use the 80/20 rule. Focus on the small number of tasks that produce the biggest results.",
      },
      {
        title: "Organized Workspace",
        overview:
          "A clean and organized workspace improves focus and reduces mental distractions.",
        benefits: [
          "Better concentration",
          "Less stress",
          "Increased efficiency",
          "Improved motivation",
        ],
        expertTip:
          "Take five minutes at the end of each day to organize your desk and prepare for tomorrow.",
      },
      {
        title: "Automation & Tools",
        overview:
          "Automating repetitive tasks saves time and reduces the risk of human error, allowing you to focus on high-value work.",
        benefits: [
          "Saves significant time",
          "Reduces manual effort",
          "Ensures consistency",
          "Scales productivity",
        ],
        expertTip:
          "If you find yourself doing a manual task three times, look for a way to automate it.",
      },
      {
        title: "Batch Processing",
        overview:
          "Grouping similar tasks together and completing them in one go to reduce context switching.",
        benefits: [
          "Consistency in output",
          "Lower mental friction",
          "Streamlined workflow",
          "Reduced setup time",
        ],
        expertTip:
          "Batch all your administrative work, email replies, or expense reporting into one block per week.",
      },
      {
        title: "Standard Operating Procedures (SOPs)",
        overview:
          "Documenting your frequent workflows so you don't have to 'invent the wheel' every time you do them.",
        benefits: [
          "Reliable results",
          "Easier delegation",
          "Reduced cognitive effort",
          "Faster onboarding",
        ],
        expertTip:
          "Even personal SOPs (like how you start a new project) save massive mental energy.",
      },
    ],
  },
  {
    category: "Mental Clarity",
    topics: [
      {
        title: "Mindfulness Breaks",
        overview:
          "Mindfulness breaks help reset your brain and improve focus during long work sessions.",
        benefits: [
          "Reduces stress",
          "Improves attention",
          "Enhances emotional balance",
          "Increases creativity",
        ],
        expertTip:
          "Take a 3-minute breathing break every few hours to calm your mind and restore focus.",
      },
      {
        title: "Digital Detox",
        overview:
          "Reducing screen time and digital distractions can significantly improve mental clarity and productivity.",
        benefits: [
          "Improves sleep quality",
          "Reduces stress",
          "Increases focus",
          "Enhances real-world productivity",
        ],
        expertTip:
          "Set specific times during the day when you avoid social media and notifications.",
      },
      {
        title: "Journaling & Braindumping",
        overview:
          "Getting all the 'open loops' out of your head and onto paper to free up working memory.",
        benefits: [
          "Reduced mental load",
          "Better sleep",
          "Objective perspective",
          "Clearer priorities",
        ],
        expertTip:
          "Do a 5-minute braindump before bed to stop your brain from processing tasks while you sleep.",
      },
      {
        title: "Nature exposure",
        overview:
          "Brief exposure to natural environments (or even photos of nature) restores attention and lowers heart rates.",
        benefits: [
          "Stress reduction",
          "Restored focus",
          "Improved mood",
          "Better creativity",
        ],
        expertTip: "Spend lunch outside or near a window with greenery.",
      },
    ],
  },
  {
    category: "Health & Wellness",
    topics: [
      {
        title: "Sleep Hygiene",
        overview:
          "Quality sleep is the foundation of cognitive performance and emotional regulation.",
        benefits: [
          "Better memory consolidation",
          "Improved focus",
          "Enhanced mood",
          "Higher energy levels",
        ],
        expertTip:
          "Avoid screens 60 minutes before bed. The blue light suppresses melatonin production.",
      },
      {
        title: "Nutrition for Brain Power",
        overview:
          "What you eat directly impacts your brain's ability to focus and process information.",
        benefits: [
          "Sustained energy",
          "Reduced brain fog",
          "Better concentration",
          "Overall health",
        ],
        expertTip:
          "Stay hydrated. Even mild dehydration can significantly impair your cognitive skills.",
      },
      {
        title: "Physical Movement",
        overview:
          "Regular physical activity improves blood flow to the brain and releases neuroprotective factors.",
        benefits: [
          "Boosts creativity",
          "Reduces anxiety",
          "Improves cognitive flexibility",
          "Increases stamina",
        ],
        expertTip:
          "Try a 'walking meeting' for creative discussions. Movement often sparks new ideas.",
      },
      {
        title: "Ergonomics",
        overview:
          "Properly arranging your physical workspace to avoid strain and promote long-term physical health.",
        benefits: [
          "Less back/neck pain",
          "Reduced fatigue",
          "Consistent focus",
          "Longevity in career",
        ],
        expertTip:
          "Your screen should be at eye level, and your elbows at a 90-degree angle.",
      },
    ],
  },
  {
    category: "Digital Skills",
    topics: [
      {
        title: "Keyboard Shortcuts",
        overview:
          "Mastering keyboard shortcuts reduces reliance on the mouse and speeds up common tasks.",
        benefits: [
          "Faster workflow",
          "Reduced wrist strain",
          "Improved focus",
          "Expert efficiency",
        ],
        expertTip:
          "Pick one new shortcut every day and use it until it becomes muscle memory.",
      },
      {
        title: "IDE Mastery",
        overview:
          "Deeply understanding your development environment unlocks advanced features that save hours of work.",
        benefits: [
          "Efficient refactoring",
          "Faster debugging",
          "Better code navigation",
          "Smarter coding",
        ],
        expertTip:
          "Learn to use multiple cursors and advanced find-and-replace using regex.",
      },
      {
        title: "Version Control Mastery",
        overview:
          "Going beyond simple git commits to using rebase, cherry-pick, and bisect for a cleaner history.",
        benefits: [
          "Safer collaboration",
          "Clean project history",
          "Fast bug discovery",
          "Atomic feature work",
        ],
        expertTip:
          "Commit often, but squash your commits before merging to keep the main branch clean.",
      },
      {
        title: "Terminal Productivity",
        overview:
          "Using command-line tools and aliases to navigate your system and project suites instantly.",
        benefits: [
          "Instant file finding",
          "Rapid command execution",
          "Powerful text parsing",
          "Scriptable workflows",
        ],
        expertTip:
          "Build your own dotfiles and aliases for common sequences like starting your dev server.",
      },
    ],
  },
  {
    category: "Learning & Growth",
    topics: [
      {
        title: "The Feynman Technique",
        overview:
          "To learn a concept deeply, try explaining it to someone else in the simplest terms possible.",
        benefits: [
          "Identifies knowledge gaps",
          "Deepens understanding",
          "Improves communication",
          "Better retention",
        ],
        expertTip:
          "Write it down. If you can't explain it on paper, you don't understand it yet.",
      },
      {
        title: "Active Recall",
        overview:
          "Testing yourself on material rather than re-reading it leads to much stronger memory formation.",
        benefits: [
          "Long-term retention",
          "Efficient studying",
          "Better comprehension",
          "Higher exam scores",
        ],
        expertTip:
          "Close the book and try to summarize the key points from memory after every chapter.",
      },
      {
        title: "Spaced Repetition",
        overview:
          "Reviewing learned material at increasing intervals to permanently move it into long-term memory.",
        benefits: [
          "Permanent knowledge",
          "Minimum review time",
          "Beat the 'forgetting curve'",
          "Expertise building",
        ],
        expertTip:
          "Use flashcard systems (like Anki) for complex syntax or technical definitions.",
      },
      {
        title: "Metacognition",
        overview:
          "The art of thinking about your own thinking – evaluating your learning process as you do it.",
        benefits: [
          "Better problem-solving",
          "Self-awareness",
          "Optimized study habits",
          "Emotional regulation",
        ],
        expertTip:
          "Ask yourself 'What was difficult about this task?' every Friday to improve next week.",
      },
    ],
  },
  {
    category: "Goal Setting",
    topics: [
      {
        title: "SMART Goals",
        overview:
          "SMART goals help you create clear and achievable objectives. SMART stands for Specific, Measurable, Achievable, Relevant, and Time-bound. Instead of vague goals like 'work more', SMART goals help define exactly what you want to achieve and how you will measure progress.",
        benefits: [
          "Clear direction",
          "Better motivation",
          "Trackable progress",
          "Higher achievement rate",
        ],
        expertTip:
          "Break your big yearly goals into quarterly, monthly, and weekly SMART goals. Write them down somewhere visible. Reviewing your goals daily reminds your brain what to prioritize and prevents you from drifting into unimportant tasks.",
      },
      {
        title: "Visualization Technique",
        overview:
          "Visualization involves mentally picturing yourself successfully completing a task or achieving a goal. This technique strengthens motivation and prepares your brain for success.",
        benefits: [
          "Improves motivation",
          "Boosts confidence",
          "Reduces anxiety",
          "Enhances performance",
        ],
        expertTip:
          "Spend 3–5 minutes every morning visualizing yourself completing your most important task of the day. Imagine the environment, the actions you take, and the successful outcome. This primes your brain to perform the task more confidently.",
      },
    ],
  },
  {
    category: "Motivation & Discipline",
    topics: [
      {
        title: "Build Consistency",
        overview:
          "Consistency is more important than intensity. Small actions performed daily produce much bigger long-term results than occasional bursts of effort.",
        benefits: [
          "Creates powerful habits",
          "Builds discipline",
          "Improves long-term productivity",
          "Reduces procrastination",
        ],
        expertTip:
          "Instead of aiming for perfection, aim for consistency. If your goal is to study or work deeply, commit to at least 30 minutes every day. Even on difficult days, maintaining the habit keeps momentum alive.",
      },
      {
        title: "Reward System",
        overview:
          "Rewarding yourself after completing tasks reinforces positive behavior and increases motivation.",
        benefits: [
          "Boosts motivation",
          "Improves task completion",
          "Creates positive reinforcement",
          "Makes work enjoyable",
        ],
        expertTip:
          "Create a small reward system. For example, after finishing a difficult task, allow yourself a short walk, coffee break, or watching a favorite video. This trains your brain to associate productivity with positive feelings.",
      },
    ],
  },
  {
    category: "Procrastination Control",
    topics: [
      {
        title: "5 Minute Rule",
        overview:
          "The 5 minute rule helps overcome procrastination by committing to work on a task for just five minutes. Starting is often the hardest part, and once you begin, momentum usually carries you forward.",
        benefits: [
          "Reduces resistance",
          "Helps start difficult tasks",
          "Builds momentum",
          "Improves productivity",
        ],
        expertTip:
          "Tell yourself you will only work for five minutes. Remove all expectations of finishing the task. Most of the time, once you begin, your brain naturally continues working longer than planned.",
      },
      {
        title: "Environment Design",
        overview:
          "Your environment strongly influences your productivity. Designing your environment to reduce distractions makes focused work much easier.",
        benefits: [
          "Less distraction",
          "Better focus",
          "Higher efficiency",
          "Improved discipline",
        ],
        expertTip:
          "Remove triggers of distraction. Keep your phone in another room, block distracting websites during work hours, and create a workspace dedicated only to productive tasks.",
      },
    ],
  },
  {
    category: "Creative Thinking",
    topics: [
      {
        title: "Idea Capture System",
        overview:
          "Creative ideas often appear unexpectedly. Having a system to capture ideas quickly ensures they are not forgotten.",
        benefits: [
          "Better idea retention",
          "Encourages creativity",
          "Builds innovation habit",
          "Organized thinking",
        ],
        expertTip:
          "Always keep a notes app or small notebook with you. Whenever an idea appears, capture it immediately. Reviewing your idea list weekly can lead to valuable insights and projects.",
      },
      {
        title: "Mind Mapping",
        overview:
          "Mind mapping is a visual thinking technique that helps organize information and explore ideas creatively.",
        benefits: [
          "Improves brainstorming",
          "Clarifies complex ideas",
          "Enhances creativity",
          "Better memory retention",
        ],
        expertTip:
          "Start with a central idea in the middle of the page and branch related ideas outward. This allows your brain to explore connections freely instead of forcing a rigid structure.",
      },
    ],
  },
];

const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/[^\w-]+/g, "");
};

async function runMigration() {
  console.log("Starting migration...");

  try {
    for (const categoryItem of productivityData) {
      const categoryName = categoryItem.category;
      const docId = slugify(categoryName);
      console.log(`Migrating: ${categoryName} (ID: ${docId})...`);

      const transformedTopics = categoryItem.topics.map((topic) => {
        const benefitsMap = {};
        topic.benefits.forEach((benefit, index) => {
          benefitsMap[`benefits_${index + 1}`] = benefit;
        });

        return {
          title: topic.title,
          overview: topic.overview,
          expertTip: topic.expertTip,
          benefits: benefitsMap,
        };
      });

      await setDoc(doc(db, "productivity", docId), {
        [categoryName]: transformedTopics,
      });
    }

    console.log("Migration Complete! All data uploaded to Firestore.");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

runMigration();
