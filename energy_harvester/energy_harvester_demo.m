%% Gym Energy Harvester - DEMO MODE (No Arduino Needed)
%  Simulates a user pulling a cable machine and generating energy
%  Run this to see what the real data will look like

%% Section 1: Simulate and Plot Live Data
clear; clc; close all;

% --- Simulation Parameters ---
totalTime = 30;          % 30 second session
dt = 0.1;                % Same rate as Arduino (10 readings/sec)
loadResistance = 100;    % Same as Arduino code (ohms)

% Time array
t = 0:dt:totalTime;
n = length(t);

% Simulate pulling a cable: bursts of voltage (like reps)
voltage = zeros(1, n);
for i = 1:n
    % Simulate 10 reps with pauses between them
    repPhase = mod(t(i), 3);  % 3 second rep cycle
    if repPhase < 1.0
        % Pulling phase - generates voltage
        voltage(i) = 2.5 * sin(pi * repPhase / 1.0) + 0.3 * randn();
    else
        % Rest phase - no pull
        voltage(i) = 0.1 * abs(randn());
    end
    voltage(i) = max(voltage(i), 0);  % No negative voltage
end

% Calculate power and energy (same formulas as Arduino)
power = (voltage .^ 2) / loadResistance;
energy = cumtrapz(t, power);

% --- Create Figure ---
fig = figure('Name', 'Gym Energy Harvester - DEMO', 'NumberTitle', 'off', ...
    'Position', [100, 100, 800, 600], 'Color', 'w');

% Voltage plot
ax1 = subplot(3,1,1);
hVolt = plot(ax1, t(1), voltage(1), 'b-', 'LineWidth', 1.5);
ylabel(ax1, 'Voltage (V)');
title(ax1, 'Generator Output Voltage');
grid(ax1, 'on');
set(ax1, 'FontSize', 10);
xlim(ax1, [0 totalTime]);
ylim(ax1, [0 4]);

% Power plot
ax2 = subplot(3,1,2);
hPower = plot(ax2, t(1), power(1), 'r-', 'LineWidth', 1.5);
ylabel(ax2, 'Power (W)');
title(ax2, 'Instantaneous Power');
grid(ax2, 'on');
set(ax2, 'FontSize', 10);
xlim(ax2, [0 totalTime]);
ylim(ax2, [0 0.1]);

% Energy plot
ax3 = subplot(3,1,3);
hEnergy = plot(ax3, t(1), energy(1), 'Color', [0 0.7 0], 'LineWidth', 2);
ylabel(ax3, 'Energy (J)');
xlabel(ax3, 'Time (s)');
title(ax3, 'Total Energy Harvested');
grid(ax3, 'on');
set(ax3, 'FontSize', 10);
xlim(ax3, [0 totalTime]);
ylim(ax3, [0 max(energy) * 1.1]);

% --- Animate the plots (simulates live data coming in) ---
fprintf('Simulating 30 seconds of cable pulls...\n\n');

for i = 1:5:n
    r = 1:i;
    set(hVolt,   'XData', t(r), 'YData', voltage(r));
    set(hPower,  'XData', t(r), 'YData', power(r));
    set(hEnergy, 'XData', t(r), 'YData', energy(r));

    % Print status every 50 readings
    if mod(i, 50) == 0
        fprintf('Time: %.1fs | Voltage: %.2fV | Power: %.4fW | Total Energy: %.4fJ\n', ...
            t(i), voltage(i), power(i), energy(i));
    end

    drawnow limitrate;
end

fprintf('\n--- Simulation Complete ---\n');
fprintf('Duration: %.1f seconds\n', totalTime);
fprintf('Peak voltage: %.2f V\n', max(voltage));
fprintf('Peak power: %.4f W\n', max(power));
fprintf('Total energy harvested: %.4f Joules\n', energy(end));

%% Section 2: Summary Plot and Save Data
figure('Name', 'Session Summary', 'NumberTitle', 'off', ...
    'Position', [150, 150, 700, 400], 'Color', 'w');

yyaxis left;
plot(t, power, 'r-', 'LineWidth', 1.5);
ylabel('Power (W)');

yyaxis right;
plot(t, energy, 'Color', [0 0.7 0], 'LineWidth', 2);
ylabel('Cumulative Energy (J)');

xlabel('Time (s)');
title('Energy Harvester - Session Summary');
legend('Power', 'Cumulative Energy', 'Location', 'northwest');
grid on;
set(gca, 'FontSize', 11);

% Save to CSV
T = table(t', voltage', power', energy', ...
    'VariableNames', {'Time_s', 'Voltage_V', 'Power_W', 'Energy_J'});
writetable(T, 'harvester_demo_data.csv');
fprintf('Demo data saved to harvester_demo_data.csv\n');
