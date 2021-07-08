# Software Architecture Pattern


## Application Landscappace

### Monolith

- Advantages
  - Easy to understand,implement,and test
  - Easy deployment
  - Ideal for limited scope
- Disadvantages
  - Tight coupling
  - Easily leads to complex code
  - One size fit all for every subdomain

### N-tier

- Summary
  - Multiple tiers
  - Tier perform specific task
  - Tiers can be physically separated
  - Tiers aren't layers
  - Technical boundaries  
- Typical: 3 tier
  - Prsentation Tier(UI & pure UI logic)
  - Business Logic Tier(business logic)
  - Data Tier
- Advantages
  - Independent development
  - Scalability
- Disadvantages
  - Changes ripple through tiers

### Service-Oriented

- Summary
  - Multiple services
  - Each service is a business activity
  - Service composability
  - Contract standardization
  - Enterprise Service Bus
- Advantages
  - Servies are loosely coupled
  - Scalablility
  - No duplication of functionality
- Disadvantages
  - Reduced agility and team autonomy
  - Costly
  - Many differing views
  
### Microservices

- Summary
  - Multiple services
  - Each service is a business activity
  - Teams run the service
  - No logic-heavy enterprise service bus
  - Maximum automate
- Advantages
  - Services are loosely coupled and eaily scalable
  - Increased agility
  - Reliability
  - Designed to handle failures
- Disadvantages
  - Boundaries not always clear
  - Communication patterns can become complex

### Serverless

- Summary
  - Backend as a service
  - Function as a service

### peer-to-peer

- Summary
  - No central server
  - No constant connection
  - Dynamically discoverable
- Advantages
  - Share resources
  - Save cost
  - Scaling
- Disadvantages
  - possible security issues
  - Only for specific scenarios
  - Nontrivial to code
  
## Application Structure Patterns

### Layered

- Summary
  - Presentation(UI)
  - Application(Translation between UI & busniess)
  - Business(Business logic)
  - Persistence(Code to interact with the database)
  - Data(Data)
- Advantages
  - well-known among developers
  - Easy to organize
- Disadvantages
  - Can lead to monolithic applications
  - Need to write lots of code

### Microkernel

- Summary
  - Task scheduler
  - Workflow
  - Data processing
  - Browser
  - Graphic designer
- Advantages
  - Flexibility
  - Clean sparation
  - Separate tems possible
  - Add and remove functionality at runtime
- Disadvantages
  - Core API might not fit future plugins
  - Can the plugins be trusted
  - Not always clear what belongs in the core

### CQRS

- Summary
  - Command Query Responsibility Segregation
  - 2 models: read/query & write/command
  - Allows for scenario-specific queries
  - Synchronization required
  - Different from event sourcing
- Advantages
  - Simpler read queries
  - Faster and more scalable read queries
  - Easier to communicate with stakeholders
- Disadvantages
  - Added complexity
  - Learning curve
  - Possibility of data inconsistencies
  - Eventual consistency

### Event sourcing

- Summary
  - Store events instead of current state
  - Event = something that happened in the past
  - Rehydration or replay
- Advantages
  - Trace of events
  - Audit trail
  - Business language
  - Event replay
- Disadvantages
  - Replay and external systems
  - Event structure changes
  - Snapshots

### CQRS and Event sourcing combined

- Summary
  - 2 different concepts
  - Powerful combination
  - It's not for simple domains, you could start with event sourcing, then add CQRS later.
- Advantages
  - Simpler and fast queries
  - Scalable
  - Trace of event
  - Audit trail
  - Business language
- Disadvantages
  - Added complexity
  - Leaning curve
  - Data inconsistencies
  - Event structure change

## UI Patterns

### MVC

- Summary
  - Controller
  - Model
  - View
- Advantages
  - Separation of concerns
  - Parallel development
  - Popular in web frameworks
- Disadvantages
  - Controllers can become bloated
  - Different definitions

### MVP

- Summary
  - View
  - Presenter  
  - Model
- Advantages
  - Great for desktop application
  - Separation of concerns
  - Testability
- Disadvantages
  - Presenter can become bloated
  - Desktop application are less popular
  - MVVM Pattern

### MVVM

- Summary
  - View
  - ViewModel
  - Model
- Advantages
  - Great for modern desktop and mobile applications
  - Sepatation of concerns
  - Testability
- Disadvantages
  - Overkill for user interfaces
  - More difficult to debug
  - Desktop applications are less popular

