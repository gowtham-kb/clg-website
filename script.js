document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section[id]");
  const counters = document.querySelectorAll(".counter");
  const reveals = document.querySelectorAll(".reveal");
  const follower = document.getElementById("cursor-follower");

  links.forEach(link => {
    link.addEventListener("click", () => {
      links.forEach(a => a.classList.remove("active"));
      link.classList.add("active");
    });
  });

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        links.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => sectionObserver.observe(section));

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      const duration = 1800;
      const start = performance.now();

      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => counterObserver.observe(counter));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => revealObserver.observe(el));

  if (follower) {
    document.addEventListener("mousemove", (e) => {
      follower.style.opacity = "1";
      follower.style.left = `${e.clientX}px`;
      follower.style.top = `${e.clientY}px`;
    });

    document.addEventListener("mouseleave", () => {
      follower.style.opacity = "0";
    });
  }
});