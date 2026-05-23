"use client";
import { stats } from "@/data/portfolio-data";
import ScrollReveal from "./ScrollReveal";

const Stats = () => {
  return (
    <section id="stats" className="section-light" style={{ padding: '4rem 5%' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          {stats.map((stat, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{stat.icon}</div>
                <div style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1, color: 'var(--text-black)' }}>
                  {stat.value}{stat.suffix}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-black-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.5rem' }}>
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
