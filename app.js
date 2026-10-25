(() => {
  const $ = (selector) => document.querySelector(selector);
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  $("#dateInput").min = localToday;

  const defaultServices = [
    { id: "s1", title: "Consultoria individual", price: 80, duration: 60 },
    { id: "s2", title: "Atendimento técnico", price: 60, duration: 45 },
    { id: "s3", title: "Serviço personalizado", price: 50, duration: 30 }
  ];
  const read = (key, fallback) => {
    try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; }
    catch { return fallback; }
  };
  let services = read("agendaFacil.services", defaultServices);
  let appointments = read("agendaFacil.appointments", []);
  const save = () => {
    localStorage.setItem("agendaFacil.services", JSON.stringify(services));
    localStorage.setItem("agendaFacil.appointments", JSON.stringify(appointments));
  };
  const money = (value) => Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char]));
  const formatDate = (value) => value ? new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR") : "—";
  const toast = (message) => {
    const element = $("#toast"); element.textContent = message; element.classList.add("show");
    window.setTimeout(() => element.classList.remove("show"), 2800);
  };

  function renderServices() {
    $("#serviceGrid").innerHTML = services.map((service, index) => `
      <article class="service-card">
        <div class="service-art">${["✦","⌘","✳","◇","◎"][index % 5]}</div>
        <h3>${escapeHtml(service.title)}</h3>
        <p>Serviço demonstrativo. Consulte a disponibilidade diretamente com o profissional.</p>
        <div class="service-meta"><div><strong>${money(service.price)}</strong><br><small>${Number(service.duration)} minutos</small></div><button type="button" data-book="${escapeHtml(service.id)}">Solicitar →</button></div>
      </article>`).join("");
    $("#serviceSelect").innerHTML = '<option value="">Selecione um serviço</option>' + services.map(s => `<option value="${escapeHtml(s.id)}">${escapeHtml(s.title)} — ${money(s.price)}</option>`).join("");
    $("#adminServiceList").innerHTML = services.map(s => `<div class="admin-service-row"><span><strong>${escapeHtml(s.title)}</strong><br><small>${money(s.price)} · ${Number(s.duration)} min</small></span><button class="mini-button danger" data-delete-service="${escapeHtml(s.id)}" type="button">Remover</button></div>`).join("") || '<p class="empty-state">Nenhum serviço cadastrado.</p>';
  }

  function renderAppointments() {
    const filter = $("#statusFilter").value;
    const visible = appointments.filter(a => filter === "all" || a.status === filter).sort((a,b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
    $("#stats").innerHTML = [
      ["Pendentes", appointments.filter(a => a.status === "Pendente").length],
      ["Confirmados", appointments.filter(a => a.status === "Confirmado").length],
      ["Total de solicitações", appointments.length]
    ].map(([label, count]) => `<div class="stat-card"><small>${label}</small><strong>${count}</strong></div>`).join("");
    $("#appointmentsList").innerHTML = visible.length ? visible.map(a => `
      <article class="appointment">
        <div class="appointment-info"><strong>${escapeHtml(a.name)} · ${escapeHtml(a.serviceTitle)}</strong><small>${formatDate(a.date)} às ${escapeHtml(a.time)} · ${escapeHtml(a.phone)}</small><small>Status: <b>${escapeHtml(a.status)}</b>${a.notes ? " · " + escapeHtml(a.notes) : ""}</small></div>
        <div class="appointment-actions">
          ${a.status !== "Confirmado" ? `<button class="mini-button" data-status="Confirmado" data-id="${escapeHtml(a.id)}">Confirmar</button>` : ""}
          ${a.status !== "Concluído" ? `<button class="mini-button" data-status="Concluído" data-id="${escapeHtml(a.id)}">Concluir</button>` : ""}
          ${a.status !== "Cancelado" ? `<button class="mini-button danger" data-status="Cancelado" data-id="${escapeHtml(a.id)}">Cancelar</button>` : ""}
        </div>
      </article>`).join("") : '<div class="empty-state">Nenhuma solicitação encontrada para este filtro.</div>';
  }

  $("#serviceGrid").addEventListener("click", (event) => {
    const button = event.target.closest("[data-book]");
    if (button) { $("#serviceSelect").value = button.dataset.book; $("#agendar").scrollIntoView({ behavior: "smooth" }); }
  });

  $("#bookingForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const date = String(form.get("date"));
    const selected = services.find(s => s.id === form.get("serviceId"));
    const message = $("#formMessage");
    if (!selected) { message.className = "form-message error"; message.textContent = "Selecione um serviço válido."; return; }
    if (date < localToday) { message.className = "form-message error"; message.textContent = "Escolha uma data de hoje em diante."; return; }
    const appointment = {
      id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random())),
      name: String(form.get("name")).trim(), phone: String(form.get("phone")).trim(),
      serviceId: selected.id, serviceTitle: selected.title, price: selected.price,
      date, time: String(form.get("time")), notes: String(form.get("notes") || "").trim(),
      status: "Pendente", createdAt: new Date().toISOString()
    };
    if (!appointment.name || !appointment.phone || !appointment.time) {
      message.className = "form-message error"; message.textContent = "Confira os campos obrigatórios."; return;
    }
    appointments.push(appointment); save(); renderAppointments();
    message.className = "form-message success";
    message.innerHTML = `Solicitação registrada neste navegador! <strong>${escapeHtml(selected.title)}</strong>, ${formatDate(date)} às ${escapeHtml(appointment.time)}. Status: Pendente. O horário ainda precisa ser confirmado pelo profissional.`;
    const whatsappNumber = ""; // Configure um número autorizado antes de usar o WhatsApp.
    if (whatsappNumber) {
      const text = `Olá! Gostaria de solicitar um agendamento.%0AServiço: ${encodeURIComponent(selected.title)}%0AData: ${encodeURIComponent(formatDate(date))}%0AHorário: ${encodeURIComponent(appointment.time)}%0ANome: ${encodeURIComponent(appointment.name)}`;
      const link = document.createElement("a");
      link.className = "button button-full"; link.style.marginTop = "12px";
      link.href = `https://wa.me/${whatsappNumber}?text=${text}`; link.target = "_blank"; link.rel = "noopener noreferrer";
      link.textContent = "Continuar pelo WhatsApp"; message.appendChild(document.createElement("br")); message.appendChild(link);
    } else {
      const note = document.createElement("p"); note.style.marginBottom = "0";
      note.textContent = "WhatsApp demonstrativo: o profissional ainda precisa configurar um número válido.";
      message.appendChild(note);
    }
    event.currentTarget.reset(); $("#dateInput").min = localToday;
  });

  $("#openAdmin").addEventListener("click", () => { $("#adminPanel").classList.remove("hidden"); renderAppointments(); $("#adminPanel").scrollIntoView({ behavior: "smooth" }); });
  $("#closeAdmin").addEventListener("click", () => { $("#adminPanel").classList.add("hidden"); $("#servicos").scrollIntoView({ behavior: "smooth" }); });
  $("#statusFilter").addEventListener("change", renderAppointments);

  $("#appointmentsList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-status]");
    if (!button) return;
    const appointment = appointments.find(a => a.id === button.dataset.id);
    if (!appointment) return;
    if (button.dataset.status === "Confirmado") {
      const conflict = appointments.some(other => other.id !== appointment.id && other.date === appointment.date && other.time === appointment.time && other.status === "Confirmado");
      if (conflict) { toast("Já existe outro atendimento confirmado nesse horário. Verifique manualmente."); return; }
    }
    appointment.status = button.dataset.status; save(); renderAppointments(); toast("Status atualizado na demonstração.");
  });

  $("#serviceForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = String(data.get("title")).trim();
    const price = Number(data.get("price"));
    const duration = Number(data.get("duration"));
    if (!title || !Number.isFinite(price) || price < 0 || !Number.isFinite(duration) || duration < 5) { toast("Confira os dados do serviço."); return; }
    services.push({ id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())), title, price, duration });
    save(); renderServices(); event.currentTarget.reset(); toast("Serviço adicionado nesta demonstração.");
  });

  $("#adminServiceList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-service]");
    if (!button) return;
    const used = appointments.some(a => a.serviceId === button.dataset.deleteService);
    if (used) { toast("Este serviço aparece em solicitações. Mantenha-o para preservar o histórico."); return; }
    services = services.filter(s => s.id !== button.dataset.deleteService); save(); renderServices(); toast("Serviço removido.");
  });

  renderServices();
  renderAppointments();
})();
