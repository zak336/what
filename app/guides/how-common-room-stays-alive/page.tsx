"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp, Clock, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const sections = [
  { id: "intro", title: "Introduction" },
  { id: "not-social-media", title: "Not Social Media" },
  { id: "why-die", title: "Why Communities Die" },
  { id: "one-percent", title: "The One Percent Rule" },
  { id: "contribute", title: "What You Can Contribute" },
  { id: "yearbook", title: "The Digital Yearbook" },
  { id: "building", title: "Building Something That Lasts" },
  { id: "who-keeps", title: "Who Keeps It Alive" },
  { id: "fellowship", title: "The Fellowship" },
  { id: "ownership", title: "Community Ownership" },
  { id: "bigger", title: "Bigger Than A Website" },
  { id: "promise", title: "The Promise" },
  { id: "final", title: "A Final Thought" },
];

const floatingNotes = [
  { type: "confession", text: "I emailed my prof at 2 AM", top: "15%", left: "5%" },
  { type: "opportunity", text: "Google Summer of Code", top: "35%", right: "8%" },
  { type: "yearbook", text: "Class of 2027", top: "55%", left: "3%" },
  { type: "project", text: "AI Attendance System", top: "75%", right: "5%" },
];

export default function GuidePage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
      
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-black z-50 origin-left" style={{ scaleX }} />

      <div className="hidden xl:block">
        {floatingNotes.map((note, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ delay: i * 0.2 }}
            className="fixed bg-white border-2 border-black p-3 text-xs max-w-[150px] pointer-events-none rotate-[-3deg] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            style={{ top: note.top, left: note.left, right: note.right }}
          >
            <div className="font-bold uppercase text-[10px] text-gray-500 mb-1">{note.type}</div>
            <div className="font-semibold">{note.text}</div>
          </motion.div>
        ))}
      </div>

      <main className="min-h-screen bg-[#faf8f3]">
        <header className="sticky top-0 border-b-2 border-black bg-white z-40">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="font-black text-xl hover:underline">Common Room</Link>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                <span className="font-bold">12 min read</span>
              </div>
              <button onClick={() => setTocOpen(!tocOpen)} className="md:hidden p-2">
                {tocOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </header>

        {tocOpen && (
          <div className="md:hidden fixed inset-0 top-[57px] bg-white z-30 overflow-y-auto border-b-2 border-black">
            <nav className="p-4">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setTocOpen(false)}
                  className={`block py-2 font-bold ${activeSection === section.id ? "text-black" : "text-gray-400"}`}
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 flex gap-12">
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`block py-2 px-4 text-sm font-bold transition-colors border-l-2 ${
                      activeSection === section.id ? "border-black text-black" : "border-transparent text-gray-400 hover:text-black"
                    }`}
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className="flex-1 max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-20">
              <div className="inline-block border-2 border-black px-4 py-1 mb-6 bg-yellow-100">
                <span className="text-xs font-bold uppercase tracking-wider">Manifesto</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">How Common Room Stays Alive</h1>
              <p className="text-2xl font-bold text-gray-700 leading-relaxed">
                Why Common Room Only Works When Students Build It Together
              </p>
            </motion.div>

            <Section id="intro">
              <p className="text-xl leading-relaxed">Every college has stories worth remembering.</p>
              <p>There are friendships that begin in classrooms and hostels. There are projects built late at night before deadlines. There are events that become part of campus history. There are seniors whose advice changes someone's career. There are opportunities that never reach everyone who could benefit from them. There are memories that feel unforgettable in the moment but slowly fade after graduation.</p>
              <p className="font-bold text-lg">Most of these things are lost.</p>
              <p>Photos get buried in old drives. Group chats become inactive. Valuable advice disappears. Opportunities are forgotten. New students arrive every year without access to the experiences and lessons of those who came before them.</p>
              <Highlight><p className="font-bold text-xl">Common Room was created to solve that problem.</p></Highlight>
              <p>It exists to become the living archive of college life. A place where stories, opportunities, projects, startups, achievements, discussions, memories, and yearbooks can be preserved and passed on to future generations of students.</p>
              <p className="font-bold text-lg">But there is one important truth.</p>
              <PullQuote>Common Room only works if students build it together.</PullQuote>
            </Section>

            <Divider />

            <Section id="not-social-media">
              <SectionTitle>Common Room Is Not Social Media</SectionTitle>
              <p>Social media is designed to maximize attention.</p>
              <p>Posts come and go. Trends change every day. Most content disappears into endless feeds and is forgotten within hours.</p>
              <Callout>Common Room is different.</Callout>
              <p>The goal is not to create another platform where people scroll mindlessly.</p>
              <p className="font-bold text-lg">The goal is to create something lasting.</p>
              <List>
                <li>A story shared today might inspire a student three years from now.</li>
                <li>A project showcased today might help someone find collaborators next semester.</li>
                <li>An internship experience written today might help a junior prepare for their first interview.</li>
                <li>A yearbook entry created today might become a cherished memory long after graduation.</li>
              </List>
              <p className="font-bold">Everything contributed to Common Room becomes part of a larger collective memory.</p>
            </Section>

            <Divider />

            <Section id="why-die">
              <SectionTitle>Why Most College Communities Die</SectionTitle>
              <p>Every college has seen this happen before.</p>
              <YearbookBox>
                <p>A new website launches.</p>
                <p>A new community starts.</p>
                <p>People join.</p>
                <p>Everyone is excited.</p>
                <p className="mt-4">A few weeks pass.</p>
                <p>The excitement fades.</p>
                <p>Nobody contributes.</p>
                <p>The platform becomes inactive.</p>
                <p className="mt-4">Eventually it is forgotten.</p>
              </YearbookBox>
              <p className="font-bold">The problem is rarely technology.</p>
              <p className="font-bold text-xl">The problem is ownership.</p>
              <p>People assume someone else will create the content. Someone else will share opportunities. Someone else will upload photos. Someone else will document events. Someone else will preserve memories.</p>
              <PullQuote>When everyone waits for someone else, nothing gets built.</PullQuote>
            </Section>

            <Divider />

            <Section id="one-percent">
              <SectionTitle>The One Percent Rule</SectionTitle>
              <Callout>A successful community does not require everyone to contribute. It only requires a small group of people who care.</Callout>
              <p>Imagine a college with one thousand students.</p>
              <div className="bg-purple-100 border-2 border-black p-8 my-8">
                <div className="space-y-4 font-bold text-lg text-center">
                  <div className="text-2xl">1000 Students</div>
                  <div className="text-4xl">↓</div>
                  <div>100 contribute occasionally → Platform stays active</div>
                  <div className="text-4xl">↓</div>
                  <div>20 contribute regularly → Platform grows</div>
                  <div className="text-4xl">↓</div>
                  <div>10 take ownership → Platform becomes invaluable</div>
                </div>
              </div>
              <p className="font-bold">The goal is not to turn every student into a contributor.</p>
              <p className="font-bold text-lg">The goal is to make it easy for every student to contribute something meaningful.</p>
            </Section>

            <Divider />

            <Section id="contribute">
              <SectionTitle>What Can You Contribute?</SectionTitle>
              <p>You do not need to write articles every week. You do not need to spend hours maintaining the platform.</p>
              <Highlight>Even small contributions matter.</Highlight>
              <Grid>
                <GridItem>Share an internship opportunity</GridItem>
                <GridItem>Upload photographs from an event</GridItem>
                <GridItem>Write about your placement experience</GridItem>
                <GridItem>Showcase a project you built</GridItem>
                <GridItem>Document a hackathon journey</GridItem>
                <GridItem>Share resources that helped you learn</GridItem>
                <GridItem>Contribute memories to your batch yearbook</GridItem>
                <GridItem>Help a junior avoid mistakes you once made</GridItem>
                <GridItem>Tell a story that deserves to be remembered</GridItem>
              </Grid>
              <p className="font-bold text-xl mt-8">Every contribution strengthens the community.</p>
            </Section>

            <Divider />

            <Section id="yearbook">
              <SectionTitle>Why The Digital Yearbook Matters</SectionTitle>
              <p>Years after graduation, students rarely remember assignment deadlines or exam scores.</p>
              <p className="font-bold text-lg">They remember people.</p>
              <YearbookBox>
                <p>They remember friendships.</p>
                <p>They remember festivals.</p>
                <p>They remember hostel life.</p>
                <p>They remember inside jokes, farewell events, club activities, competitions, victories, failures, and moments that shaped who they became.</p>
              </YearbookBox>
              <Callout>The Digital Yearbook exists to preserve those memories.</Callout>
              <p>Future students should be able to look back and understand what campus life was like. Alumni should be able to revisit moments that mattered to them.</p>
              <PullQuote>Every graduating batch deserves a place where its story can live on.</PullQuote>
              <p className="font-bold text-lg">That is one of the most important missions of Common Room.</p>
            </Section>

            <Divider />

            <Section id="building">
              <SectionTitle>Building Something That Lasts</SectionTitle>
              <p className="font-bold">Creating a thriving community takes effort.</p>
              <p>Opportunities need to be verified. Events need to be documented. Yearbooks need to be curated. Stories need to be reviewed. Photos need to be organized. Discussions need moderation. Resources need to stay updated.</p>
              <p>None of these things happen automatically.</p>
              <p>The strongest communities are supported by people who care enough to invest their time and energy into them.</p>
              <Highlight>
                <p className="font-bold mb-3">As Common Room grows, we want to create a system where students who actively contribute to maintaining and improving their college community can take on larger responsibilities and leadership roles.</p>
                <p>These students help preserve the quality, accuracy, and usefulness of the platform for everyone else.</p>
              </Highlight>
              <p>A healthy community should create value not only for its readers, but also for the people who help build and sustain it.</p>
              <p>Over time, we hope to create opportunities that recognize meaningful contributions, encourage long term stewardship, and help student leaders develop skills in community building, content management, collaboration, and digital leadership.</p>
              <p className="font-bold text-xl">The goal is simple.</p>
              <p className="font-bold text-lg">If students help build something valuable for their college, the ecosystem should create opportunities for those students to grow along with it.</p>
            </Section>

            <Divider />

            <Section id="who-keeps">
              <SectionTitle>Who Keeps Common Room Alive?</SectionTitle>
              <Callout>Common Room is not maintained by a company sitting far away from campus life. It is maintained by students.</Callout>
              <p>Every college community needs people who care enough to preserve its stories, opportunities, and memories.</p>
              <List>
                <li>Some students contribute content.</li>
                <li>Some students review submissions.</li>
                <li>Some students curate galleries.</li>
                <li>Some students manage yearbooks.</li>
                <li>Some students help moderate discussions.</li>
                <li>Some students ensure opportunities and resources remain updated.</li>
                <li>Some students help document events and achievements that would otherwise be forgotten.</li>
              </List>
              <p className="font-bold text-lg">Together, they create something that benefits the entire college.</p>
            </Section>

            <Divider />

            <Section id="fellowship">
              <SectionTitle>The Common Room Fellowship</SectionTitle>
              <p>As Common Room grows, every college will have opportunities for students to take leadership roles within their community.</p>
              <div className="bg-blue-100 border-2 border-black p-8 my-8">
                <div className="space-y-3 font-bold text-center">
                  <div className="text-gray-600">Contributor</div>
                  <div>↓</div>
                  <div>Editor</div>
                  <div>↓</div>
                  <div>Community Lead</div>
                  <div>↓</div>
                  <div className="text-xl">College Steward</div>
                </div>
              </div>
              <p>These roles are not simply about maintaining a website.</p>
              <p className="font-bold text-lg">They are about leadership, collaboration, community building, storytelling, and preserving the culture of a college for future generations.</p>
              <p>The students who invest time and effort into helping their communities thrive should have opportunities to grow with the platform they help create.</p>
              <p>The vision is to build a system where meaningful contributions are recognized and where student leaders can gain real experience managing communities, coordinating contributors, curating content, and building something larger than themselves.</p>
            </Section>

            <Divider />

            <Section id="ownership">
              <SectionTitle>Common Room Belongs To Its Community</SectionTitle>
              <p>Common Room provides the platform. Students shape what it becomes.</p>
              <p>Every college develops its own culture, traditions, stories, achievements, and priorities. The people closest to those experiences are the students themselves.</p>
              <Callout>That is why Common Room is designed to be community driven.</Callout>
              <p>The long term vision is not a centrally managed platform where every decision comes from a small team.</p>
              <p className="font-bold text-lg">The vision is a network of student communities guided, curated, and strengthened by the people who know their campuses best.</p>
              <p>When students take ownership, communities become more authentic. They become more useful. They become more sustainable.</p>
              <p className="font-bold text-lg">The best version of Common Room is one where every college has students who proudly help maintain, improve, and preserve the collective memory of their campus.</p>
            </Section>

            <Divider />

            <Section id="bigger">
              <SectionTitle>This Is Bigger Than A Website</SectionTitle>
              <p>Common Room is not just a magazine. It is not just a forum. It is not just a yearbook. It is not just a collection of opportunities.</p>
              <PullQuote>It is a shared memory of an entire college community.</PullQuote>
              <p>Every story contributes to it. Every project strengthens it. Every photo enriches it. Every opportunity helps it grow. Every student leaves a mark on it.</p>
              <p className="font-bold text-xl">The value of Common Room is not determined by its technology.</p>
              <p className="font-bold text-2xl">It is determined by the people who choose to participate.</p>
            </Section>

            <Divider />

            <Section id="promise">
              <SectionTitle>The Common Room Promise</SectionTitle>
              <p>We want to create something that lasts longer than a semester.</p>
              <p>Something that survives after students graduate.</p>
              <p>Something that future batches can inherit and improve.</p>
              <div className="bg-yellow-100 border-2 border-black p-8 my-8">
                <List>
                  <li className="font-bold">A place where knowledge is not lost.</li>
                  <li className="font-bold">A place where memories are preserved.</li>
                  <li className="font-bold">A place where opportunities are shared.</li>
                  <li className="font-bold">A place where students help students.</li>
                  <li className="font-bold">A place that truly belongs to the community.</li>
                </List>
              </div>
            </Section>

            <Divider />

            <Section id="final">
              <SectionTitle>A Final Thought</SectionTitle>
              <PullQuote>Common Room is not a product you consume. It is a place you leave better than you found it.</PullQuote>
              <p>Every story shared, opportunity posted, photo uploaded, project showcased, discussion started, and memory preserved makes the community more valuable for everyone who comes after you.</p>
              <Highlight>
                <p className="font-bold text-lg">We are building the room.</p>
                <p className="font-bold text-lg">Students make it worth staying in.</p>
              </Highlight>
              <p>And one day, when a future student discovers a story, opportunity, project, photograph, or memory that would have otherwise been lost, they will benefit from the contributions of people they may never meet.</p>
              <p className="font-bold text-xl">That is how communities endure.</p>
              <p className="font-bold text-xl">That is how memories survive.</p>
              <p className="font-bold text-2xl">That is how Common Room stays alive.</p>
            </Section>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 bg-gradient-to-br from-purple-100 to-blue-100 border-2 border-black p-12 text-center"
            >
              <div className="max-w-xl mx-auto space-y-4 text-lg leading-relaxed">
                <p>One day a student you will never meet may discover:</p>
                <p className="font-bold">An opportunity.</p>
                <p className="font-bold">A story.</p>
                <p className="font-bold">A project.</p>
                <p className="font-bold">A photograph.</p>
                <p className="font-bold">A piece of advice.</p>
                <p className="mt-6 text-xl font-bold">Because someone before them cared enough to contribute.</p>
                <p className="text-xl font-bold">That is how communities survive.</p>
                <p className="text-xl font-bold">That is how memories endure.</p>
                <p className="text-2xl font-black mt-6">That is how Common Room stays alive.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 bg-black text-white p-10 border-3 border-black text-center"
            >
              <h3 className="text-3xl font-black mb-4">Join the Movement</h3>
              <p className="text-lg mb-6 text-gray-300">
                Help preserve your college's story. Become part of the founding community.
              </p>
              <Link href="/" className="inline-block px-8 py-4 bg-white text-black font-bold hover-lift uppercase tracking-wide">
                Join Common Room
              </Link>
            </motion.div>
          </article>
        </div>

        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 p-4 bg-black text-white border-3 border-black hover-lift z-40"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </main>
    </>
  );
}

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="mb-16 scroll-mt-24"
    >
      <div className="space-y-4 text-gray-800 leading-relaxed">
        {children}
      </div>
    </motion.section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-4xl md:text-5xl font-black mb-8 mt-12">{children}</h2>;
}

function Divider() {
  return <div className="my-16 border-t-2 border-black opacity-20" />;
}

function Callout({ children }: { children: React.ReactNode }) {
  return <div className="bg-purple-100 border-l-4 border-black p-6 my-6 font-bold text-xl">{children}</div>;
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return <blockquote className="my-12 pl-8 border-l-4 border-black text-2xl md:text-3xl font-black italic">{children}</blockquote>;
}

function List({ children }: { children: React.ReactNode }) {
  return <ul className="my-6 space-y-3 list-none pl-4">{children}</ul>;
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid md:grid-cols-3 gap-3 my-8">{children}</div>;
}

function GridItem({ children }: { children: React.ReactNode }) {
  return <div className="bg-white border-2 border-black p-4 text-sm font-bold">{children}</div>;
}

function Highlight({ children }: { children: React.ReactNode }) {
  return <div className="bg-yellow-100 border-2 border-black p-6 my-6">{children}</div>;
}

function YearbookBox({ children }: { children: React.ReactNode }) {
  return <div className="bg-white border-2 border-black p-8 my-8 font-mono text-sm space-y-2">{children}</div>;
}
