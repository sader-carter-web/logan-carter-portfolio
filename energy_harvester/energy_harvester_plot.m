%% Gym Energy Harvester - MATLAB Data Logger & Plotter
%  Reads serial data from Arduino and plots power & energy in real time
%  Make sure Arduino is plugged in and running energy_harvester.ino
%
%  HOW TO USE:
%  1. Upload energy_harvester.ino to Arduino
%  2. Close the Arduino Serial Monitor (only one program can use the port)
%  3. Update the port variable below
%  4. Click "Run" in MATLAB
%  5. Pull the cable to generate data
%  6. Press Ctrl+C to stop recording
%  7. Run Section 2 to save data to CSV

%% Section 1: Live Data Collection
clear; clc; close all;

% =============================================
% UPDATE THIS TO YOUR ARDUINO PORT
% Check: Arduino IDE > Tools > Port
% Mac example:   '/dev/cu.usbmodem14101'
% Windows example: 'COM3'
% =============================================
port = '/dev/cu.usbmodem14101';
baudRate = 9600;

% Connect to Arduino
fprintf('Connecting to Arduino on %s...\n', port);
s = serialport(port, baudRate);
configureTerminator(s, 'LF');
pause(2);  % Wait for Arduino to reset after connection

% Flush the header line that Arduino sends on startup
readline(s);
fprintf('Connected! Pull the cable to start generating data.\n');
fprintf('Press Ctrl+C to stop.\n\n');

% Preallocate arrays for speed
maxPoints = 5000;
timeData   = zeros(1, maxPoints);
voltData   = zeros(1, maxPoints);
powerData  = zeros(1, maxPoints);
energyData = zeros(1, maxPoints);
idx = 0;

% Create figure with 3 subplots
fig = figure('Name', 'Gym Energy Harvester', 'NumberTitle', 'off', ...
    'Position', [100, 100, 800, 600], 'Color', 'w');

% Voltage plot
ax1 = subplot(3,1,1);
hVolt = plot(ax1, 0, 0, 'b-', 'LineWidth', 1.5);
ylabel(ax1, 'Voltage (V)');
title(ax1, 'Generator Output Voltage');
grid(ax1, 'on');
set(ax1, 'FontSize', 10);

% Power plot
ax2 = subplot(3,1,2);
hPower = plot(ax2, 0, 0, 'r-', 'LineWidth', 1.5);
ylabel(ax2, 'Power (W)');
title(ax2, 'Instantaneous Power');
grid(ax2, 'on');
set(ax2, 'FontSize', 10);

% Energy plot
ax3 = subplot(3,1,3);
hEnergy = plot(ax3, 0, 0, 'Color', [0 0.7 0], 'LineWidth', 2);
ylabel(ax3, 'Energy (J)');
xlabel(ax3, 'Time (s)');
title(ax3, 'Total Energy Harvested');
grid(ax3, 'on');
set(ax3, 'FontSize', 10);

% Main data collection loop
try
    while true
        % Read one line of CSV from Arduino
        rawLine = readline(s);
        parts = strsplit(char(rawLine), ',');

        % Parse the 4 values: time, voltage, power, energy
        if length(parts) == 4
            vals = str2double(parts);

            if ~any(isnan(vals))
                idx = idx + 1;

                timeData(idx)   = vals(1) / 1000;  % ms to seconds
                voltData(idx)   = vals(2);
                powerData(idx)  = vals(3);
                energyData(idx) = vals(4);

                % Print to command window every 10 readings
                if mod(idx, 10) == 0
                    fprintf('Voltage: %.2fV | Power: %.4fW | Total Energy: %.4fJ\n', ...
                        vals(2), vals(3), vals(4));
                end

                % Update plots every 5 readings for smooth animation
                if mod(idx, 5) == 0
                    r = 1:idx;
                    set(hVolt,   'XData', timeData(r), 'YData', voltData(r));
                    set(hPower,  'XData', timeData(r), 'YData', powerData(r));
                    set(hEnergy, 'XData', timeData(r), 'YData', energyData(r));

                    % Auto-scale axes
                    xlim(ax1, [timeData(1), timeData(idx) + 0.1]);
                    xlim(ax2, [timeData(1), timeData(idx) + 0.1]);
                    xlim(ax3, [timeData(1), timeData(idx) + 0.1]);

                    drawnow limitrate;
                end
            end
        end
    end

catch
    % This runs when you press Ctrl+C
    fprintf('\n--- Recording Stopped ---\n');
    if idx > 0
        fprintf('Data points collected: %d\n', idx);
        fprintf('Duration: %.1f seconds\n', timeData(idx) - timeData(1));
        fprintf('Peak voltage: %.2f V\n', max(voltData(1:idx)));
        fprintf('Peak power: %.4f W\n', max(powerData(1:idx)));
        fprintf('Total energy harvested: %.4f Joules\n', energyData(idx));
    end
end

% Close serial connection
clear s;

%% Section 2: Save Data to CSV (run this after stopping)
if idx > 0
    r = 1:idx;
    T = table(timeData(r)', voltData(r)', powerData(r)', energyData(r)', ...
        'VariableNames', {'Time_s', 'Voltage_V', 'Power_W', 'Energy_J'});
    writetable(T, 'harvester_data.csv');
    fprintf('Data saved to harvester_data.csv\n');

    % Final summary plot
    figure('Name', 'Session Summary', 'NumberTitle', 'off', ...
        'Position', [150, 150, 700, 400], 'Color', 'w');

    yyaxis left;
    plot(timeData(r), powerData(r), 'r-', 'LineWidth', 1.5);
    ylabel('Power (W)');

    yyaxis right;
    plot(timeData(r), energyData(r), 'Color', [0 0.7 0], 'LineWidth', 2);
    ylabel('Cumulative Energy (J)');

    xlabel('Time (s)');
    title('Energy Harvester - Session Summary');
    legend('Power', 'Cumulative Energy', 'Location', 'northwest');
    grid on;
    set(gca, 'FontSize', 11);

    fprintf('Summary plot generated.\n');
else
    fprintf('No data to save. Run Section 1 first.\n');
end
